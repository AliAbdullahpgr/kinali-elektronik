-- Add normalized search field for Turkish-aware, accent-insensitive search
ALTER TABLE "Product"
ADD COLUMN "search_normalized" TEXT NOT NULL DEFAULT '';

CREATE INDEX "Product_search_normalized_idx" ON "Product"("search_normalized");

-- Add durable slug redirect mapping table
CREATE TYPE "RedirectEntityType" AS ENUM ('PRODUCT', 'CATEGORY');

CREATE TABLE "SlugRedirect" (
    "id" TEXT NOT NULL,
    "entity_type" "RedirectEntityType" NOT NULL,
    "from_slug" TEXT NOT NULL,
    "to_slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "SlugRedirect_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SlugRedirect_entity_type_from_slug_key"
ON "SlugRedirect"("entity_type", "from_slug");

CREATE INDEX "SlugRedirect_entity_type_to_slug_idx"
ON "SlugRedirect"("entity_type", "to_slug");
