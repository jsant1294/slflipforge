export async function POST(req) {
  const body = await req.json()

  const itemName = body.itemName || 'Item'
  const brand = body.brand || 'Generic'
  const condition = body.condition || 'Used'
  const category = body.category || 'Tools'
  const notes = body.notes || ''
  const price = body.priceTarget || '0'

  const title = `${brand} ${itemName} - ${condition} ${category} Listing`
  const description = [
    `${brand} ${itemName} in ${condition.toLowerCase()} condition.`,
    `Category: ${category}.`,
    notes ? `Details: ${notes}` : 'See photos and message with questions.',
    `Priced to move at $${price}.`
  ].join('\n\n')

  const keywords = [
    brand,
    itemName,
    category,
    condition,
    'marketplace',
    'pickup',
    'reseller',
  ].filter(Boolean)

  return Response.json({
    ok: true,
    listing: {
      title,
      description,
      keywords,
      category,
      price,
    }
  })
}
