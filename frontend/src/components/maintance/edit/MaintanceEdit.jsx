import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import MaintanceBaseEdit from "./MaintanceBaseEdit";
import axiosInstance from "../../../utils/api";

const MaintanceEdit = () => {
  const { id } = useParams();
  const [maintance, setMaintance] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchMaintance = async () => {
      try {
        const response = await axiosInstance.get(`/maintenances/${id}`);
        setMaintance(response.data.results);
      } catch (error) {
        toast.error("No se ha podido obtener los datos.");
      }
    };
    fetchMaintance();
  }, []);

  return <MaintanceBaseEdit maintance={maintance} />;
};

export default MaintanceEdit;
