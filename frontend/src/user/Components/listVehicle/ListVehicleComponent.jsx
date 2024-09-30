import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./listVehicle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faSquare } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import img from "../../../images/default.png";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import CarCard from "../CarCard/CarCard";
import { getAllVehicles } from "../../../Api/api";
import { useErrorHandler } from "../../ErrorHandlers/ErrorHandler";
import Spinner from "../../../common/spinners/Spinner";
import closeIcon from "../../../assets/closeIcon.svg";
import leftArrow from "../../../assets/leftArrow.svg";
import notFound from "../../../assets/not_found.jpg";

const cache = {};

export default function ListVehicleComponent() {
  const { userAuthenticationHandler } = useErrorHandler();

  const [vehicles, setVehicles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    segment: "",
    type: "",
  });
  const [sort, setSort] = useState(null);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef(null);

  const navigate = useNavigate();

  // Handle search input change
  const handleSearchInputChange = (e) => {
    if (!e?.target?.value) return setSearchInput(e.target.value);

    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setSearchInput(e.target.value);
    }, 500);
  };

  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setSearchInput(searchInput + transcript);
    }
  }, [transcript]);

  function isFiveMinutesLater(storedTime) {
    const currentTime = Date.now();
    const fiveMinutesInMs = 5 * 60 * 1000;

    if (currentTime - storedTime >= fiveMinutesInMs) {
      return true;
    } else {
      return false;
    }
  }

  const fetchVehicles = async () => {
    try {
      const key = `${searchInput} ${sort} ${filter?.category} ${filter?.segment} ${filter?.type}`;
      if (cache[key]) {
        if (!isFiveMinutesLater(cache[key].createdAt)) {
          setVehicles(cache[key]?.data || []);
          return;
        }
      }

      setLoading(true);
      const { data } = await getAllVehicles(
        searchInput,
        sort,
        filter?.category,
        filter?.segment,
        filter?.type
      );
      setVehicles(data?.data || []);
      cache[key] = { createdAt: new Date(), data: data?.data || [] };
      console.log("set cache[key]", cache);
    } catch (err) {
      userAuthenticationHandler(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [searchInput, sort, filter]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(function (error) {});

  const items = [
    {
      label: "Sort",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Low To High",
          icon: "pi pi-fw pi-align-left",
          command: () => {
            setSort(1);
          },
        },
        {
          label: "High To Low",
          icon: "pi pi-fw pi-align-right",
          command: () => {
            setSort(-1);
          },
        },
      ],
    },
    {
      label: "Filter",
      icon: "pi pi-fw pi-calendar",
      submenu: false,
      items: [
        {
          label: "Category",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Manual",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, category: "manual" }));
              },
            },
            {
              label: "Automatic",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, category: "automatic" }));
              },
            },
          ],
        },
        {
          label: "Segment",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Vintage",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, segment: "vintage" }));
              },
            },
            {
              label: "Premium",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, segment: "premium" }));
              },
            },
            {
              label: "Normal",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, segment: "normal" }));
              },
            },
          ],
        },
        {
          label: "Type",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Sedan",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, type: "Sedan" }));
              },
            },
            {
              label: "Hatchback",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, type: "Hatchback" }));
              },
            },
            {
              label: "SUV",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, type: "SUV" }));
              },
            },
            {
              label: "Crossover",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, type: "Crossover" }));
              },
            },
            {
              label: "Coupe",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, type: "Coupe" }));
              },
            },
            {
              label: "Convertible",
              icon: "pi pi-fw pi-home",
              command: () => {
                setFilter((prev) => ({ ...prev, type: "Convertible" }));
              },
            },
          ],
        },
      ],
    },
    {
      icon: () => (
        <div className={style.filterCardContainer}>
          {sort && (
            <FilterCard
              onDelete={() => setSort(null)}
              name={sort === 1 ? "Low To High" : "High To Low"}
            />
          )}
          {Object.keys(filter).map((item, i) => {
            if (filter[item]) {
              return (
                <FilterCard
                  key={i}
                  onDelete={() => {
                    setFilter((prev) => ({ ...prev, [item]: "" }));
                  }}
                  name={filter[item]}
                />
              );
            }
          })}
        </div>
      ),
    },
  ];

  const FilterCard = ({ name, onDelete }) => (
    <div className={style.filterCard}>
      {name} <img onClick={onDelete} src={closeIcon} />
    </div>
  );

  const end = (
    <div className={style.endContainer}>
      <InputText
        // value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search"
        type="text"
        className="w-full"
      />
      <span className="px-2">
        {listening ? (
          <FontAwesomeIcon
            onClick={SpeechRecognition.stopListening}
            icon={faSquare}
            style={{ color: "#b00c0c" }}
          />
        ) : (
          <FontAwesomeIcon
            onClick={SpeechRecognition.startListening}
            icon={faMicrophone}
          />
        )}
      </span>
    </div>
  );

  const Start = () => (
    <img
      onClick={() => navigate(-1)}
      className={style.homeIcon}
      src={leftArrow}
    />
  );

  return (
    <section>
      <div className="row justify-content-center my-5 mx-3">
        <div>
          <div className="card">
            <Menubar start={<Start />} model={items} end={end} />
          </div>
        </div>

        {!loading ? (
          vehicles.length > 0 ? (
            <div className={style.cardContainer}>
              {vehicles.map((x, i) => (
                <CarCard
                  key={i}
                  x={x}
                  reviews={x.reviews}
                  category={x.category}
                  seats={x.seats}
                  year={x.year}
                  price={x.price}
                  img={x?.image[0]?.url}
                  name={x.product_name}
                />
              ))}
            </div>
          ) : (
            <img className={style.notFound} src={notFound} alt="" />
          )
        ) : (
          <Spinner />
        )}
      </div>
    </section>
  );
}
