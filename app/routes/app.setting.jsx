import { SaveBar, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import {
    Checkbox,
    Form,
    Page,
    Select,
    Tabs,
    TextField
} from "@shopify/polaris";
import {
    AdjustIcon,
    AffiliateIcon,
    AirplaneIcon
} from "@shopify/polaris-icons";
import {
    asChoiceField,
    notEmpty,
    useField,
    useForm
} from "@shopify/react-form";
import { useCallback, useEffect, useState } from "react";

import CollapsibleSection from "../components/setting/CollapsibleSection";
import DeliveryDateTab from "../components/setting/DeliveryDateTab";
import StorePickupTab from "../components/setting/StorePickupTab";
import styles from "../styles/setting.css?url";

export const links = () => [{ rel: "stylesheet", href: styles }];

const layoutOptions = [
  {
    id: 1,
    label: "Default",
    value: "Default",
  },
  {
    id: 2,
    label: "Layout 1",
    value: "Layout 1",
  },
];

const calendarLayoutOptions = [
  {
    id: 1,
    label: "Calendar",
    value: "Calendar",
  },
  {
    id: 2,
    label: "New Calendar",
    value: "New Calendar",
  },
];

const calendarLanguageOptions = [
  {
    id: 1,
    label: "English",
    value: "English",
  },
  {
    id: 2,
    label: "Arabic",
    value: "Arabic",
  },
];

const firstDayOfCalendarOptions = [
  {
    id: 1,
    label: "Monday",
    value: "Monday",
  },
  {
    id: 2,
    label: "Sunday",
    value: "Sunday",
  },
];

const dateFormatOptions = [
  {
    id: 1,
    label: "10/05/22",
    value: "10/05/22",
  },
  {
    id: 2,
    label: "05 Oct 2022",
    value: "05 Oct 2022",
  },
];

const defaultColor = "#000000";

export default function SettingPage() {
  const [tabIdx, setTabIdx] = useState(0);
  const shopify = useAppBridge();

  const { fields, submit, submitting, dirty, reset, submitErrors, makeClean } =
    useForm({
      fields: {
        showTheCalendarAtTheProductPage: useField(false),
        requireTheDeliveryDateBeforeCheckout: useField(false),
        alwaysOpenTheCalendar: useField(false),

        layout: useField({
          value: layoutOptions[0].value,
          validates: [notEmpty("Layout is required")],
        }),
        calendarLayout: useField({
          value: calendarLayoutOptions[0].value,
          validates: [notEmpty("Calendar Layout is required")],
        }),
        calendarLanguage: useField({
          value: calendarLanguageOptions[0].value,
          validates: [notEmpty("Calendar Language is required")],
        }),
        firstDayOfCalendar: useField({
          value: firstDayOfCalendarOptions[0].value,
          validates: [notEmpty("First Day of Calendar is required")],
        }),
        dateFormat: useField({
          value: dateFormatOptions[0].value,
          validates: [notEmpty("Date Format is required")],
        }),

        themeColor: useField(defaultColor),
        titleColor: useField(defaultColor),
        requiredMessageTextColor: useField(defaultColor),

        title: useField({
          value: null,
          validates: [notEmpty("Title is required")],
        }),
        deliveryDateLabel: useField({
          value: "",
          validates: [notEmpty("Delivery date label is required")],
        }),
        deliveryDateTitle: useField({
          value: "",
          validates: [notEmpty("Delivery date title is required")],
        }),
        deliveryTimeLabel: useField({
          value: "",
          validates: [notEmpty("Delivery time label is required")],
        }),
        deliveryDateRequiredMessageText: useField({
          value: "",
          validates: [notEmpty("Required Message Text is required")],
        }),
        storePickupLabel: useField({
          value: "",
          validates: [notEmpty("Store Pickup Label is required")],
        }),
        messageTextToRequireBuyersToChooseAPickupLocation: useField({
          value: "",
          validates: [notEmpty("Message is required")],
        }),
        storePickupDateTitle: useField({
          value: "",
          validates: [notEmpty("Store pickup date title is required")],
        }),
        storePickupTimeTitle: useField({
          value: "",
          validates: [notEmpty("Store pickup time title is required")],
        }),
        storePickupRequiredMessageText: useField({
          value: "",
          validates: [notEmpty("Required message text is required")],
        }),
      },
      async onSubmit(form) {
        console.log(form);
        return { status: "success" };
      },
    });

  const tabs = [
    {
      id: "1",
      content: "Delivery Date",
      component: <DeliveryDateTab fields={fields} />,
    },
    {
      id: "2",
      content: "Store Pickup",
      component: <StorePickupTab fields={fields} />,
    },
  ];

  const handleTabChange = useCallback(
    (selectedTabIndex) => setTabIdx(selectedTabIndex),
    [],
  );

  const handleSave = () => {
    submit();
  };

  const handleDiscard = (e) => {
    reset();
  };

  useEffect(() => {
    dirty
      ? shopify.saveBar.show("my-save-bar")
      : shopify.saveBar.hide("my-save-bar");
  }, [dirty]);

  return (
    <Page>
      <SaveBar id="my-save-bar">
        <button variant="primary" onClick={handleSave}></button>
        <button onClick={handleDiscard}></button>
      </SaveBar>
      <Form onSubmit={submit}>
        <TitleBar title="Widget Setting" />

        <CollapsibleSection heading="Widget position" icon={AdjustIcon}>
          <div className="checkbox-block">
            <Checkbox
              label="Show the calendar at the product page"
              {...asChoiceField(fields.showTheCalendarAtTheProductPage)}
            />
          </div>

          <div>
            <Checkbox
              label="Require the delivery date before checkout"
              {...asChoiceField(fields.requireTheDeliveryDateBeforeCheckout)}
            />
          </div>
        </CollapsibleSection>

        <br />

        <CollapsibleSection heading="Widget appearance" icon={AffiliateIcon}>
          <div className="form-grid">
            <div className="form-grid-col">
              <Select
                label="Layout"
                options={layoutOptions}
                {...fields.layout}
              />
            </div>
            <div className="form-grid-col">
              <Select
                label="Calendar layout"
                options={calendarLayoutOptions}
                {...fields.calendarLayout}
              />
              <Checkbox
                label="Always open the calendar"
                {...asChoiceField(fields.alwaysOpenTheCalendar)}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-grid-col">
              <Select
                label="Calendar language"
                options={calendarLanguageOptions}
                {...fields.calendarLayout}
              />
            </div>
            <div className="form-grid-col">
              <Select
                label="First day of calendar"
                options={firstDayOfCalendarOptions}
                {...fields.firstDayOfCalendar}
              />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-grid-col">
              <Select
                label="Date format"
                options={dateFormatOptions}
                {...fields.dateFormat}
              />
            </div>
            <div className="form-grid-col">
              <div className="color-picker-block">
                <TextField label="Theme color" {...fields.themeColor} />
                <input type="color" {...fields.themeColor} />
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-grid-col">
              <div className="color-picker-block">
                <TextField label="Title color" {...fields.titleColor} />
                <input type="color" {...fields.titleColor} />
              </div>
            </div>
            <div className="form-grid-col">
              <div className="color-picker-block">
                <TextField
                  label="Required message text color"
                  {...fields.requiredMessageTextColor}
                />
                <input type="color" {...fields.requiredMessageTextColor} />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <br />

        <CollapsibleSection heading="Widget text" icon={AirplaneIcon}>
          <div className="tab-block">
            <Tabs
              tabs={tabs}
              selected={tabIdx}
              onSelect={handleTabChange}
              fitted
            >
              {tabs[tabIdx].component}
            </Tabs>
          </div>
        </CollapsibleSection>
      </Form>
    </Page>
  );
}
