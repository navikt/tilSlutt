import { FlexColumn, FlexRow, PaddingSize } from "../Layout";
import { Field } from "react-final-form";
import React from "react";
import styled from "styled-components";
import { TrackedKnapp } from "@/components/buttons/TrackedKnapp";
import Fritekst from "@/components/Fritekst";
import { AlertstripeFullbredde } from "@/components/AlertstripeFullbredde";

const texts = {
  forhandsvisning: "Forhåndsvisning",
};

const FritekstWrapper = styled.div`
  margin-bottom: 4em;
`;

interface FritekstSeksjonProps {
  fieldName: string;
  label: string;
  handlePreviewClick: () => void;
  maxLength: number;
  alertText?: string;
}

const FritekstSeksjon = ({
  fieldName,
  label,
  handlePreviewClick,
  maxLength,
  alertText,
}: FritekstSeksjonProps) => (
  <FritekstWrapper>
    <FlexRow bottomPadding={PaddingSize.SM}>
      <FlexColumn flex={1}>
        <Field<string> name={fieldName}>
          {({ input, meta }) => (
            <Fritekst
              data-cy={fieldName + "TextArea"}
              size="medium"
              maxLength={maxLength}
              label={label}
              feil={meta.submitFailed && meta.error}
              id={fieldName}
              {...input}
            />
          )}
        </Field>
      </FlexColumn>
    </FlexRow>
    {!!alertText && (
      <FlexRow bottomPadding={PaddingSize.SM}>
        <AlertstripeFullbredde type="advarsel">
          <p>{alertText}</p>
        </AlertstripeFullbredde>
      </FlexRow>
    )}
    <FlexRow>
      <TrackedKnapp
        htmlType="button"
        data-cy={fieldName + "Knapp"}
        context={label}
        onClick={handlePreviewClick}
      >
        {texts.forhandsvisning}
      </TrackedKnapp>
    </FlexRow>
  </FritekstWrapper>
);

export default FritekstSeksjon;
