import { useProductByUuid } from "@/hooks/use-products";
import { useRoute } from "wouter";
import { Loader2, MessageCircle, AlertTriangle, CheckCircle2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PublicItemPage() {
  const [, params] = useRoute("/item/:uuid");
  const uuid = params?.uuid || "";
  const { data, isLoading, error } = useProductByUuid(uuid);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="bg-destructive/10 p-4 rounded-full mb-4">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold font-display mb-2">Item Not Found</h1>
        <p className="text-muted-foreground max-w-md">
          This QR code doesn't seem to be associated with an active item, or it may have been deleted by the owner.
        </p>
      </div>
    );
  }

  const { product, ownerWhatsapp } = data;
  const isLost = product.status === "lost";
  
  const whatsappUrl = `https://wa.me/${ownerWhatsapp}?text=${encodeURIComponent(
    `Hi, I found your ${product.name}.`
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-primary/10 to-transparent -z-10" />

      <div className="max-w-md w-full animate-in fade-in-up">
        {/* Header Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-primary p-2 rounded-lg text-white shadow-lg shadow-primary/30">
            <QrCode className="h-6 w-6" />
          </div>
          <span className="font-display font-bold text-xl">FindMyStuff</span>
        </div>

        <Card className="border-0 shadow-2xl overflow-hidden">
          {/* Status Banner */}
          <div className={`py-4 px-6 text-center font-bold text-white flex items-center justify-center gap-2 ${
            isLost ? 'bg-destructive' : 'bg-green-600'
          }`}>
            {isLost ? (
              <>
                <AlertTriangle className="w-5 h-5 fill-white/20" />
                <span>Marked as LOST</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 fill-white/20" />
                <span>Registered Item</span>
              </>
            )}
          </div>

          <CardHeader className="text-center pt-8 pb-4">
            <h1 className="text-3xl font-display font-bold text-foreground">{product.name}</h1>
            <p className="text-sm font-medium text-primary uppercase tracking-wider mt-1">
              {product.category}
            </p>
          </CardHeader>

          <CardContent className="space-y-6 pb-8 px-8">
            <div className="bg-muted/50 p-4 rounded-xl text-center text-muted-foreground italic">
              "{product.description || "No specific description provided."}"
            </div>

            {product.reward && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-xl p-4 text-center">
                <p className="text-xs uppercase font-bold text-amber-600 dark:text-amber-400 mb-1">Reward if found</p>
                <p className="text-lg font-bold text-amber-800 dark:text-amber-200">{product.reward}</p>
              </div>
            )}

            <Separator />

            <div className="space-y-3">
              <p className="text-center text-sm text-muted-foreground">
                Found this item? Please contact the owner securely via WhatsApp.
              </p>
              
              <Button 
                className="w-full h-12 text-lg font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all bg-[#25D366] hover:bg-[#20bd5a] text-white border-0"
                asChild
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                  Contact Owner
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Powered by FindMyStuff • Secure & Private
        </p>
      </div>
    </div>
  );
}
