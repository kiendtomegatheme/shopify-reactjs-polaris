import { TextField } from "@shopify/polaris";

export default function DeliveryDateTab({ fields }) {
  return (
    <div>
      <TextField label="Title" {...fields.title} />
      <TextField label="Delivery date label" {...fields.deliveryDateLabel} />
      <TextField label="Delivery date title" {...fields.deliveryDateTitle} />
      <TextField label="Delivery time label" {...fields.deliveryTimeLabel} />
      <TextField
        label="Required message text"
        {...fields.deliveryDateRequiredMessageText}
      />
    </div>
  );
}
