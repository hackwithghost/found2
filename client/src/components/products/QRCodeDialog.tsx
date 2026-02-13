import { type Product } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Download, Share2, ExternalLink } from "lucide-react";
import QRCode from "react-qr-code";
import { useRef } from "react";
import * as htmlToImage from "html-to-image";

interface QRCodeDialogProps {
  product: Product;
}

export function QRCodeDialog({ product }: QRCodeDialogProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  
  // Use window.location.origin to get the current domain
  const itemUrl = `${window.location.origin}/item/${product.uuid}`;

  const handleDownload = async () => {
    if (!qrRef.current) return;
    
    try {
      const dataUrl = await htmlToImage.toPng(qrRef.current, { backgroundColor: 'white', style: { padding: '20px' } });
      const link = document.createElement('a');
      link.download = `qrcode-${product.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download QR code', err);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(itemUrl);
    // Could add toast here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 border-0 shadow-none">
          <QrCode className="mr-2 h-4 w-4" />
          Show QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code for {product.name}</DialogTitle>
          <DialogDescription>
            Print this code and attach it to your item. Scanning it reveals your contact info.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <div 
            ref={qrRef} 
            className="bg-white p-6 rounded-xl shadow-inner border border-slate-100"
          >
            <QRCode 
              value={itemUrl}
              size={200}
              level="H"
              viewBox={`0 0 256 256`}
            />
            <div className="text-center mt-2 text-xs font-mono text-slate-400">
              {product.uuid.slice(0, 8)}...
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full">
            <Button onClick={handleDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
            <Button variant="outline" onClick={handleCopyLink} className="w-full">
              <Share2 className="mr-2 h-4 w-4" />
              Copy Link
            </Button>
          </div>
          
          <div className="text-center w-full">
            <a 
              href={itemUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-primary flex items-center justify-center gap-1 transition-colors"
            >
              Preview public page <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
