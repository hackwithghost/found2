import { type Product } from "@shared/schema";
import { useUpdateProduct, useDeleteProduct } from "@/hooks/use-products";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QRCodeDialog } from "./QRCodeDialog";
import { 
  Trash2, 
  ShieldCheck, 
  AlertTriangle, 
  MoreHorizontal,
  Tag
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isLost = product.status === "lost";

  const toggleStatus = () => {
    updateProduct.mutate({
      id: product.id,
      status: isLost ? "safe" : "lost",
    });
  };

  return (
    <Card className="group overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className={`h-2 w-full ${isLost ? "bg-destructive" : "bg-primary"}`} />
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge 
              variant={isLost ? "destructive" : "outline"} 
              className={`mb-2 capitalize ${!isLost && "bg-green-50 text-green-700 border-green-200"}`}
            >
              {isLost ? (
                <><AlertTriangle className="w-3 h-3 mr-1" /> Lost</>
              ) : (
                <><ShieldCheck className="w-3 h-3 mr-1" /> Safe</>
              )}
            </Badge>
            <h3 className="font-display font-bold text-xl text-foreground leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Tag className="w-3 h-3 mr-1" />
              {product.category}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={toggleStatus}>
                Mark as {isLost ? "Safe" : "Lost"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Item
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {product.description || "No description provided."}
        </p>

        {product.reward && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg text-sm text-amber-800 dark:text-amber-200">
            <span className="font-bold">Reward:</span> {product.reward}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <QRCodeDialog product={product} />
        
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete 
                <span className="font-bold text-foreground"> {product.name} </span>
                and its QR code will stop working immediately.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={() => deleteProduct.mutate(product.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleteProduct.isPending ? "Deleting..." : "Delete Item"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
