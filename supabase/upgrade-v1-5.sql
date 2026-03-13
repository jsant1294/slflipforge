alter table items
add column if not exists sold_price numeric default 0;

alter table items
add column if not exists fees numeric default 0;

alter table items
add column if not exists shipping_cost numeric default 0;

alter table items
add column if not exists notes text;

alter table buyer_inquiries
add column if not exists item_name text;

alter table buyer_inquiries
add column if not exists status text default 'new';

NOTIFY pgrst, 'reload schema';
