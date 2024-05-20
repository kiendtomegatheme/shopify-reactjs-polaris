import { TextField } from "@shopify/polaris";

export default function StorePickupTab({ fields }) {
  return (
    <div>
      <TextField label="Store pickup label" {...fields.storePickupLabel} />
      <TextField
        label="Message text to require buyers to choose a pickup location"
        {...fields.messageTextToRequireBuyersToChooseAPickupLocation}
      />
      <TextField
        label="Store pickup date title"
        {...fields.storePickupDateTitle}
      />
      <TextField
        label="Store pickup time title"
        {...fields.storePickupTimeTitle}
      />
      <TextField
        label="Required message text"
        {...fields.storePickupRequiredMessageText}
      />
    </div>
  );
}
