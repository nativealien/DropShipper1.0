# Docs

## Postgres and Docker

```
docker --version

docker run hello-world

docker run --name dev-postgres \
  -e POSTGRES_USER=devuser \
  -e POSTGRES_PASSWORD=devpass \
  -e POSTGRES_DB=devdb \
  -p 5432:5432 \
  -d postgres:16

docker ps

docker stop dev-postgres

docker start dev-postgres
```


The add product component should on submit send an object looking like this: {
  provider: 'cj',
  pid: <product pid> // <- static no input
  sku: <product sku> // <- static no input
  name: <product productNameEn>
  description: <product description>
  imageUrl: <product productImage> <-- static no input
  imageSet: <product productImageSet> <-- static no input
  storefrontIds: Array[the id from users storefront]
  variants: [ <-- One for each variant
        {
      "vid": <product vid>,
      "sku": <product variantSku>,
      "name": <product variantName>,
      "key": <product variantKey>,
      "standard": <product variantStandard>,
      "length": <product variantLength>,
      "width": <product variantWidth>,
      "height": <product variantHeight>,
      "weight": <product variantWeight>,
      "image_url": <product variantImage>,
      "buy_price": <product variantSellPrice>,
      "suggested_price": <product variantSugSellPrice>,
      "margin_percent": <calculate from buy_price and sell_price>,
      "sell_price": <FROM USER INPUT>
    }
  ]
}
So basically, the only thing the user puts in should be, the sell price of the variants. And to check what variants to have. When clicking submit, send to api call createProduct