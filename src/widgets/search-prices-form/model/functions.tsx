import type { CountriesMap, Country, GeoResponse } from "@/shared/types";
import { Bed, Building2 } from "lucide-react";

export const createDropdownOptions = ({
  countriesMap,
  geoMap,
}: {
  countriesMap?: CountriesMap;
  geoMap?: GeoResponse;
}) => {
  if (!countriesMap && !geoMap) return [];

  const source = geoMap ?? countriesMap;
  const arr = Object.values(source ?? {});

  const icon = {
    country: (item: Country) => (
      <img
        style={{ width: 16, flex: "none" }}
        src={item.flag}
        alt={item.name}
      />
    ),
    city: () => <Building2 style={{ flex: "none" }} size={16} />,
    hotel: () => <Bed style={{ flex: "none" }} size={16} />,
  };

  const sorted = arr.map((item: any) => ({
    ...item,
    countryId: !!item.countryId
      ? item.countryId
      : (item.type === "country" || !item.type) && item.id,
    icon:
      item.type && icon[item.type as keyof typeof icon]
        ? icon[item.type as keyof typeof icon](item)
        : icon.country(item as Country),
  }));

  return sorted;
};
