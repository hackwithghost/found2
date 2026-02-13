import { useProducts } from "@/hooks/use-products";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { ProductCard } from "@/components/products/ProductCard";
import { Loader2, PackageOpen } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

export default function Dashboard() {
  const { data: products, isLoading } = useProducts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">My Items</h1>
            <p className="text-muted-foreground mt-1">
              Manage your registered belongings and QR codes.
            </p>
          </div>
          <AddProductDialog />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed rounded-3xl bg-muted/30">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <PackageOpen className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">No items yet</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Start by adding an item you want to protect. We'll generate a unique QR code for it.
            </p>
            <AddProductDialog />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in">
            {products?.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 100}ms` }} className="animate-in fade-in-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
