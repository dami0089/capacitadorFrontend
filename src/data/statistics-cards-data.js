import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: BanknotesIcon,
    title: "Facturado Hoy",
    value: "$ 6500",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "que la semana pasada",
    },
  },
  {
    color: "pink",
    icon: UserIcon,
    title: "Total de Clientes",
    value: "34",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "que el mes pasado",
    },
  },
  {
    color: "green",
    icon: UserPlusIcon,
    title: "Nuevos clientes",
    value: "5",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "que en enero",
    },
  },
  {
    color: "orange",
    icon: ChartBarIcon,
    title: "Facturado Total",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
