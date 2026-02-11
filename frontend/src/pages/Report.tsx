import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { Download, ArrowLeft, FileText, TrendingUp, FlaskConical, Scale, Globe, Ship, BookOpen } from "lucide-react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const results = location.state?.results || {};

  const handleDownload = () => {
    const reportOutput = results.REPORT?.output;
    if (reportOutput) {
      let downloadUrl = "";
      let filename = "sanjaya_ai_report.pdf";

      if (reportOutput.download_url) {
        downloadUrl = `${API_BASE_URL}${reportOutput.download_url}`;
        filename = reportOutput.filename || "report.pdf";
      } else if (reportOutput.file_path) {
        filename = reportOutput.file_path.split(/[\\/]/).pop() || "report.pdf";
        downloadUrl = `${API_BASE_URL}/reports/${filename}`;
      }

      if (downloadUrl) {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success(`✅ Downloading report: ${filename}`);
        return;
      }
    }
    toast.error("❌ Report file path not found.");
  };

  const iqviaRaw = results.IQVIA?.output?.result || results.IQVIA?.output?.data || results.IQVIA?.output;
  const iqvia = Array.isArray(iqviaRaw) ? iqviaRaw : [];

  const clinicalReport = results.CLINICAL?.output || {};
  const activeTrials = clinicalReport.active_trials || {};
  const sponsorProfiles = clinicalReport.sponsor_profiles || {};
  const phaseDistribution = clinicalReport.phase_distribution || {};

  const patentsRaw = results.PATENTS?.output?.data || results.PATENTS?.output?.result || results.PATENTS?.output;
  const patents = Array.isArray(patentsRaw) ? patentsRaw : [];

  const eximOutput = results.EXIM?.output || {};
  const eximTrade = eximOutput.trade_data || {};
  const eximInsights = eximOutput.insights || {};

  const internalOutput = results.INTERNAL?.output || {};
  const web = results.WEB?.output || {};
  const synth = results.SYNTHESIZED || {};

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm h-24 flex items-center">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Research Report</h1>
          </div>
          <Button onClick={() => navigate("/")} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Drug & Market Intelligence Report
          </h2>
          <p className="text-muted-foreground mt-2">
            Generated on {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric"
            })}
          </p>
        </div>

        <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {/* Executive Summary Card */}
          {results.SYNTHESIZED && (
            <Card className="p-6 shadow-lg bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Executive Summary & Synthesis
              </h3>
              <div className="text-foreground leading-relaxed whitespace-pre-line text-sm mb-4">
                {synth.summary || synth.final_summary || "Synthesized analysis completed."}
              </div>
              {(synth.recommendations) && (
                <div className="p-4 bg-card rounded-lg border border-primary/20">
                  <p className="text-sm font-semibold text-primary mb-2">Strategic Recommendations:</p>
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">{synth.recommendations}</p>
                </div>
              )}
            </Card>
          )}

          {/* Market Insights Card */}
          {results.IQVIA && (
            <Card className="p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">IQVIA Commercial Market Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {iqvia.length > 0 ? (
                      iqvia.map((item: any, idx: number) => (
                        <div key={idx} className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-muted-foreground mb-1">
                            Region: <span className="font-medium text-foreground">{item.region || "Global"}</span>
                          </p>
                          <p className="text-lg font-semibold text-foreground mt-2">
                            Sales: ${item.sales_value != null ? Number(item.sales_value).toLocaleString() : "N/A"}M
                          </p>
                          <p className="text-sm text-emerald-600 font-medium mt-1">
                            CAGR: {item.cagr != null ? `${item.cagr}%` : "N/A"}
                          </p>
                          {item.sales_volume && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Volume: {Number(item.sales_volume).toLocaleString()} units
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="bg-muted rounded-lg p-4 col-span-3">
                        <p className="text-sm text-muted-foreground">
                          {results.IQVIA?.output?.response || results.IQVIA?.output?.error || "Market data query processed."}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Summary Stats */}
                  {iqvia.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            ${iqvia.reduce((sum: number, item: any) => sum + (Number(item.sales_value) || 0), 0).toLocaleString()}M
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Total Sales Value</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {iqvia.length}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Regions</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-emerald-600">
                            {(iqvia.reduce((sum: number, item: any) => sum + (Number(item.cagr) || 0), 0) / iqvia.length).toFixed(1)}%
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">Avg CAGR</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* EXIM Trade Trends Card */}
          {results.EXIM && (
            <Card className="p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <Ship className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">EXIM Global Trade & Sourcing Intelligence</h3>
                  {eximTrade.summary ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-xs text-muted-foreground">Total Export Value</p>
                          <p className="text-lg font-semibold text-foreground mt-1">
                            ${(eximTrade.summary.total_export_value || 0).toLocaleString()}
                          </p>
                          {eximTrade.cagr?.export && (
                            <p className="text-xs text-emerald-600 mt-1">CAGR: {eximTrade.cagr.export}%</p>
                          )}
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-xs text-muted-foreground">Total Import Value</p>
                          <p className="text-lg font-semibold text-foreground mt-1">
                            ${(eximTrade.summary.total_import_value || 0).toLocaleString()}
                          </p>
                          {eximTrade.cagr?.import && (
                            <p className="text-xs text-emerald-600 mt-1">CAGR: {eximTrade.cagr.import}%</p>
                          )}
                        </div>
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-xs text-muted-foreground">Trade Balance / Dependency</p>
                          <p className="text-lg font-semibold text-foreground mt-1">
                            {eximInsights.dependency_metrics?.trade_balance != null 
                              ? `$${eximInsights.dependency_metrics.trade_balance.toLocaleString()}` 
                              : "Calculated"}
                          </p>
                          {eximInsights.dependency_metrics?.import_dependency_ratio != null && (
                            <p className="text-xs text-amber-600 mt-1">
                              Dependency Ratio: {eximInsights.dependency_metrics.import_dependency_ratio}%
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Top Trade Partners */}
                      {Array.isArray(eximTrade.top_partners) && eximTrade.top_partners.length > 0 && (
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm font-semibold text-foreground mb-2">Top Trade Partners:</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                            {eximTrade.top_partners.slice(0, 8).map((partner: any, idx: number) => (
                              <div key={idx} className="p-2 bg-background rounded border border-border">
                                <span className="font-medium">{partner.partner || partner.partnerCode || `Partner ${idx + 1}`}</span>: ${Number(partner.trade_value || 0).toLocaleString()}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">
                        {eximOutput.response || eximOutput.trade_data?.message || "Trade data processed."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Clinical Trials Card */}
          {results.CLINICAL && (
            <div className="space-y-6">
              {/* Active Trials */}
              <Card className="p-6 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center shrink-0">
                    <FlaskConical className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Clinical Trials Landscape</h3>
                    <div className="bg-muted rounded-lg p-4 mb-3">
                      <p className="text-sm text-muted-foreground mb-2">
                        Active Trials Found: <span className="font-semibold text-foreground">{activeTrials.total_found || 0}</span>
                        {activeTrials.condition_searched && <span> for condition: {activeTrials.condition_searched}</span>}
                      </p>
                      <div className="space-y-3">
                        {activeTrials.trials?.slice(0, 5).map((trial: any, idx: number) => (
                          <div key={idx} className="p-3 bg-background rounded-md border border-border">
                            <div className="flex justify-between items-start mb-1">
                              <a href={trial.trial_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline block truncate max-w-[70%]">
                                {trial.nct_id} - {trial.title}
                              </a>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{trial.phase}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                              <span>Sponsor: {trial.sponsor}</span>
                              <span>Status: {trial.status}</span>
                              <span>Enrollment: {trial.enrollment || "N/A"}</span>
                              <span>Locations: {trial.locations_count || 0}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {activeTrials.view_all_url && (
                      <a href={activeTrials.view_all_url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                        View All on ClinicalTrials.gov →
                      </a>
                    )}
                  </div>
                </div>
              </Card>

              {/* Sponsor Profiles */}
              {sponsorProfiles.sponsors && sponsorProfiles.sponsors.length > 0 && (
                <Card className="p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Top Clinical Trial Sponsors</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {sponsorProfiles.sponsors.slice(0, 6).map((sponsor: any, idx: number) => (
                          <div key={idx} className="bg-muted rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-sm truncate pr-2" title={sponsor.sponsor_name}>{sponsor.sponsor_name}</h4>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">{sponsor.number_of_trials} Trials</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">Class: {sponsor.sponsor_class || "N/A"}</p>
                            <p className="text-xs text-muted-foreground">Phases: {sponsor.phases_involved?.join(", ") || "N/A"}</p>
                            {sponsor.sponsor_trials_url && (
                              <a href={sponsor.sponsor_trials_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-2 inline-block">
                                View Sponsor Trials →
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Phase Distribution */}
              {phaseDistribution.distributions && phaseDistribution.distributions.length > 0 && (
                <Card className="p-6 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0">
                      <Scale className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Trial Phase Distribution</h3>
                      <div className="space-y-4">
                        {phaseDistribution.distributions.map((dist: any, idx: number) => (
                          <div key={idx} className="bg-muted rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm">{dist.phase}</span>
                              <span className="text-sm font-bold">{dist.percentage != null ? dist.percentage.toFixed(1) : 0}% ({dist.number_of_trials})</span>
                            </div>
                            <div className="w-full bg-background rounded-full h-2 mb-2">
                              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${Math.min(dist.percentage || 0, 100)}%` }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground">Top Sponsors: {dist.top_sponsors?.slice(0, 3).join(", ") || "N/A"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          )}

          {/* Patent Landscape Card */}
          {results.PATENTS && (
            <Card className="p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shrink-0">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Patent Landscape & FTO</h3>
                  <div className="bg-muted rounded-lg p-4">
                    {patents.length > 0 ? (
                      <ul className="space-y-2">
                        {patents.map((p: any, idx: number) => (
                          <li key={idx} className="text-sm text-foreground p-2 bg-background rounded border border-border">
                            <span className="font-bold text-purple-600">{p.patent_number}</span>: {p.title} 
                            {p.expiration_date && <span className="text-xs text-muted-foreground ml-2">(Expires: {p.expiration_date})</span>}
                            {p.assignee && <span className="text-xs text-muted-foreground block">Assignee: {p.assignee}</span>}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {results.PATENTS?.output?.response || "No active patent barriers or patents data available."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Internal Knowledge Card */}
          {results.INTERNAL && (
            <Card className="p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Internal Knowledge & Strategy Insights</h3>
                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    {internalOutput.summary ? (
                      <>
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Briefing Summary</h4>
                          <p className="text-sm text-foreground leading-relaxed">{internalOutput.summary}</p>
                        </div>
                        {internalOutput.takeaways && (
                          <div className="pt-2 border-t border-border">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Key Takeaways</h4>
                            <p className="text-sm text-foreground whitespace-pre-line">{internalOutput.takeaways}</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {internalOutput.response || internalOutput.error || "Internal knowledge assessment processed."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Web Intelligence Card */}
          {results.WEB && (
            <Card className="p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shrink-0">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Web & Literature Intelligence</h3>
                  <div className="bg-muted rounded-lg p-4 space-y-3">
                    {web.result ? (
                      <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                        {web.result}
                      </div>
                    ) : web.summary?.summary ? (
                      <div>
                        <p className="text-sm text-foreground mb-2 font-medium">
                          {web.summary.summary[0]}
                        </p>
                        {web.summary.quotes?.length > 0 && (
                          <div className="mt-2 text-xs italic text-muted-foreground border-l-2 border-orange-400 pl-2">
                            "{web.summary.quotes[0].text}" — {web.summary.quotes[0].context}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {web.response || "Web intelligence gathered from scientific databases and guidelines."}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button onClick={handleDownload} size="lg" className="gap-2">
            <Download className="w-5 h-5" />
            Download PDF Report
          </Button>
          <Button onClick={() => navigate("/")} variant="outline" size="lg" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chat
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Report;