import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import HandymanIcon from "@mui/icons-material/Handyman";

export const navigation = [
  {
    segment: "usuarios",
    title: "Usuarios",
    icon: <PersonIcon style={{ color: "white" }} />,
  },
  {
    segment: "responsables",
    title: "Responsables",
    icon: <AssignmentIndIcon style={{ color: "white" }} />,
  },
  {
    segment: "proveedores",
    title: "Proveedores",
    icon: <LocalShippingIcon style={{ color: "white" }} />,
    path: "/suppliers",
  },
  {
    segment: "ubicaciones",
    title: "Ubicaciones",
    icon: <PlaceIcon style={{ color: "white" }} />,
  },

  {
    segment: "ingresos",
    title: "Ingresos",
    icon: <AttachMoneyIcon style={{ color: "white" }} />,
  },
  {
    segment: "activos",
    title: "Activos",
    icon: <InventoryIcon style={{ color: "white" }} />, // Ícono blanco
  },
  {
    segment: "mantenimientos",
    title: "Mantenimientos",
    icon: <HandymanIcon style={{ color: "white" }} />, // Ícono blanco
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon style={{ color: "white" }} />, // Ícono blanco
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon style={{ color: "white" }} />, // Ícono blanco
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon style={{ color: "white" }} />, // Ícono blanco
      },
    ],
  },
];
