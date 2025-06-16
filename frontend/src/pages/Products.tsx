import React, { useState, useEffect } from "react";
import { useKeycloak } from "../contexts/KeycloakContext.tsx";
import api from "../services/api.ts";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: number;
  cost?: number;
  margin?: string;
}

interface ProductsData {
  message: string;
  data: Product[];
  userRole: string;
  showPricing: string;
}

const Products: React.FC = () => {
  const { userInfo, hasRole } = useKeycloak();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsData, setProductsData] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/products");
        setProductsData(response.data);
        setProducts(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load products");
        console.error("Products error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>🔄 Loading Products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#f8d7da",
          borderRadius: "8px",
        }}
      >
        <h2>❌ Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  const isAdmin = hasRole("admin");

  return (
    <div>
      <h1>🛍️ Products</h1>

      {/* Info about pricing */}
      <div
        style={{
          backgroundColor: isAdmin ? "#f39c12" : "#3498db",
          color: "white",
          padding: "1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <h3>
          {isAdmin
            ? "👑 Admin View - Wholesale Pricing"
            : "👤 User View - Retail Pricing"}
        </h3>
        <p>
          {isAdmin
            ? "You see wholesale prices, costs, and profit margins."
            : "You see standard retail prices available to customers."}
        </p>
        <p>
          <strong>User Role:</strong> {productsData?.userRole} |
          <strong> Pricing Type:</strong> {productsData?.showPricing}
        </p>
      </div>

      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1rem",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "#f8f9fa",
              padding: "1.5rem",
              borderRadius: "8px",
              border: "1px solid #dee2e6",
            }}
          >
            <h3 style={{ margin: "0 0 1rem 0" }}>{product.name}</h3>

            <div style={{ marginBottom: "1rem" }}>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <p>
                <strong>In Stock:</strong> {product.inStock}
              </p>
            </div>

            {/* Pricing section */}
            <div
              style={{
                backgroundColor: isAdmin ? "#fff3cd" : "#d1ecf1",
                padding: "1rem",
                borderRadius: "4px",
                marginBottom: "1rem",
              }}
            >
              <p style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
                <strong>
                  {isAdmin ? "Wholesale Price:" : "Price:"} ${product.price}
                </strong>
              </p>

              {isAdmin && product.cost && (
                <>
                  <p style={{ margin: "0 0 0.5rem 0" }}>
                    <strong>Cost:</strong> ${product.cost}
                  </p>
                  <p style={{ margin: "0", color: "#28a745" }}>
                    <strong>Profit Margin:</strong> ${product.margin}
                  </p>
                </>
              )}
            </div>

            {/* Stock status */}
            <div>
              <span
                style={{
                  backgroundColor:
                    product.inStock > 10
                      ? "#28a745"
                      : product.inStock > 0
                      ? "#ffc107"
                      : "#dc3545",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "4px",
                  fontSize: "0.9rem",
                }}
              >
                {product.inStock > 10
                  ? "✅ In Stock"
                  : product.inStock > 0
                  ? "⚠️ Low Stock"
                  : "❌ Out of Stock"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Admin additional info */}
      {isAdmin && (
        <div
          style={{
            backgroundColor: "#e2e3e5",
            padding: "1.5rem",
            borderRadius: "8px",
            marginTop: "2rem",
          }}
        >
          <h3>👑 Admin Features</h3>
          <p>As an administrator, you can see:</p>
          <ul>
            <li>Wholesale pricing (lower than retail)</li>
            <li>Product costs and profit margins</li>
            <li>Inventory management data</li>
          </ul>
          <p>
            <em>
              Regular users only see retail pricing without cost information.
            </em>
          </p>
        </div>
      )}

      {/* API Response Debug */}
      <details style={{ marginTop: "2rem" }}>
        <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
          🔍 API Response Debug
        </summary>
        <pre
          style={{
            backgroundColor: "#f8f9fa",
            padding: "1rem",
            borderRadius: "4px",
            overflow: "auto",
            fontSize: "0.8rem",
            marginTop: "1rem",
          }}
        >
          {JSON.stringify(productsData, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default Products;
