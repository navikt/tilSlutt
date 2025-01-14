import React, { ReactElement } from "react";
import { AktivitetskravStatus } from "@/data/aktivitetskrav/aktivitetskravTypes";
import { AvventAktivitetskravSkjema } from "@/components/aktivitetskrav/vurdering/AvventAktivitetskravSkjema";
import { IkkeAktuellAktivitetskravSkjema } from "@/components/aktivitetskrav/vurdering/IkkeAktuellAktivitetskravSkjema";
import { Modal } from "@navikt/ds-react";

const texts = {
  modalContentLabel: "Vurder aktivitetskrav",
};

export type ModalType = `${Extract<
  AktivitetskravStatus,
  AktivitetskravStatus.AVVENT | AktivitetskravStatus.IKKE_AKTUELL
>}`;

interface VurderAktivitetskravModalProps {
  isOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  modalType: ModalType | undefined;
  aktivitetskravUuid: string | undefined;
}

export const VurderAktivitetskravModal = ({
  isOpen,
  setModalOpen,
  modalType,
  aktivitetskravUuid,
}: VurderAktivitetskravModalProps) => {
  return (
    <Modal
      onClose={() => setModalOpen(false)}
      open={isOpen}
      aria-labelledby={texts.modalContentLabel}
    >
      {modalType && (
        <Modal.Content className={"min-w-[600px] p-8"}>
          <VurderAktivitetskravModalContent
            setModalOpen={setModalOpen}
            modalType={modalType}
            aktivitetskravUuid={aktivitetskravUuid}
          />
        </Modal.Content>
      )}
    </Modal>
  );
};

interface VurderAktivitetskravModalContentProps {
  setModalOpen: (modalOpen: boolean) => void;
  modalType: ModalType;
  aktivitetskravUuid: string | undefined;
}

const VurderAktivitetskravModalContent = ({
  modalType,
  ...rest
}: VurderAktivitetskravModalContentProps): ReactElement => {
  switch (modalType) {
    case "AVVENT": {
      return <AvventAktivitetskravSkjema {...rest} />;
    }
    case "IKKE_AKTUELL": {
      return <IkkeAktuellAktivitetskravSkjema {...rest} />;
    }
  }
};
