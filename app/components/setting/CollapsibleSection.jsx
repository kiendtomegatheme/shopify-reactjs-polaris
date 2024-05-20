import { Card, Collapsible, Icon, Text } from "@shopify/polaris";
import {
  ChevronDownIcon,
  ChevronRightIcon
} from "@shopify/polaris-icons";
import { useState } from "react";

export default function CollapsibleSection({ heading, icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="collapsible-section">
      <Card>
        <div
          className="collapsible-section-header"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <Icon source={icon} setting={{ margin: 0 }} />
          <Text variant="headingMd" as="h6">
            {heading}
          </Text>
          <Icon
            className="test"
            source={open ? ChevronDownIcon : ChevronRightIcon}
            setting={{ margin: 0 }}
          />
        </div>
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition={{ duration: "500ms", timingFunction: "ease-in-out" }}
          expandOnPrint
        >
          {children}
        </Collapsible>
      </Card>
    </div>
  );
}
