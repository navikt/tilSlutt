import React, { ReactElement, useRef, useState } from "react";
import "@navikt/ds-css";
import { Search } from "@navikt/ds-react";
import BehandlerSearchResult from "@/components/behandler/BehandlerSearchResult";
import { BehandlerAlert } from "@/components/behandler/BehandlerAlert";
import { BehandlerDTO } from "@/data/behandler/BehandlerDTO";
import styled from "styled-components";

const SearchWrapper = styled.div`
  display: flex;
  > * {
    width: 30em;
  }
`;

interface BehandlerSearchProps {
  setSelectedBehandler: (behandler?: BehandlerDTO) => void;
  label?: string;
}

const BehandlerSearch = ({
  setSelectedBehandler,
  label,
}: BehandlerSearchProps): ReactElement => {
  const searchRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSearchResult, setselectedSearchResult] = useState(""); //TODO: Finn bedre navn/oppsett
  const [popoverIsOpen, setPopoverIsOpen] = useState<boolean>(false);
  const setSearchText = (text) => {
    if (text.length > 3) {
      setSearchValue(text);
    } else if (searchValue.length > 3) {
      setSearchValue("");
    }
    setselectedSearchResult(text);
    setSelectedBehandler(undefined);
    setPopoverIsOpen(true);
  };
  return (
    <>
      <SearchWrapper>
        <Search
          label={label}
          ref={searchRef}
          size="small"
          variant="simple"
          onChange={(searchText) => setSearchText(searchText)}
          clearButton={false}
          hideLabel={label === undefined}
          value={selectedSearchResult}
        />
        {popoverIsOpen && (
          <BehandlerSearchResult
            searchRef={searchRef}
            searchText={searchValue}
            setPopoverIsOpen={setPopoverIsOpen}
            setSelectedBehandler={setSelectedBehandler}
            setSelectedSearchResult={setselectedSearchResult}
          />
        )}
      </SearchWrapper>
      <BehandlerAlert />
    </>
  );
};

export default BehandlerSearch;
