import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PlaceIcon from "@mui/icons-material/Place";
import DevicesIcon from "@mui/icons-material/Devices";
import BuildIcon from "@mui/icons-material/Build";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";
export const NAVIGATION = [
  {
    segment: "usuarios",
    title: "Usuarios",
    icon: <PersonIcon style={{ color: "white" }} />,
  },
  {
    segment: "proveedores",
    title: "Proveedores",
    icon: <LocalShippingIcon style={{ color: "white" }} />,
  },
  {
    segment: "ubicaciones",
    title: "Ubicaciones",
    icon: <PlaceIcon style={{ color: "white" }} />,
  },
  {
    segment: "dispositivos",
    title: "Dispositivos",
    icon: <DevicesIcon style={{ color: "white" }} />,
  },
  {
    segment: "componentes",
    title: "Componentes",
    icon: <BuildIcon style={{ color: "white" }} />,
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
    icon: <EngineeringIcon style={{ color: "white" }} />, // Ícono blanco
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
