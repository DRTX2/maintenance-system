import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
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
    icon: <PersonIcon />, // Representa usuarios/personas
  },
  {
    segment: "proveedores",
    title: "Proveedores",
    icon: <LocalShippingIcon />, // Relacionado con proveedores y envíos
  },
  {
    segment: "ubicaciones",
    title: "Ubicaciones",
    icon: <PlaceIcon />, // Representa ubicaciones geográficas
  },
  {
    segment: "dispositivos",
    title: "Dispositivos",
    icon: <DevicesIcon />, // Relacionado con dispositivos electrónicos
  },
  {
    segment: "componentes",
    title: "Componentes",
    icon: <BuildIcon />, // Herramientas/partes de algo más grande
  },
  {
    segment: "ingresos",
    title: "Ingresos",
    icon: <AttachMoneyIcon />, // Relacionado con dinero o finanzas
  },
  {
    segment: "activos",
    title: "Activos",
    icon: <InventoryIcon />, // Representa bienes o inventario
  },
  {
    segment: "mantenimientos",
    title: "Mantenimientos",
    icon: <EngineeringIcon />, // Relacionado con reparaciones o mantenimiento
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
      {
        segment: "traffic",
        title: "Traffic",
        icon: <DescriptionIcon />,
      },
    ],
  },
];
