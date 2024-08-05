import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./listVehicle.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faSquare } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import img from "../../../images/default.png";
import { Chip } from "primereact/chip";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import CarCard from "../CarCard/CarCard";

export default function ListVehicleComponent({ props }) {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [uniquePlaces, setUniquePlaces] = useState([]);
  const [sortOption, setSortOption] = useState("");
  // const [ filteredVehicles , setFilteredVehicle ] = useState([])

  useEffect(() => {
    setVehicles(props);
    const data = [
      ...new Set(
        props.flatMap((item) => item.places.map((place) => place.value))
      ),
    ].map((value) => ({ label: value }));
    setUniquePlaces(data);
  }, [props]);

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Filter vehicles based on search input
  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.places.some((place) =>
        place.value.toLowerCase().includes(searchInput.toLowerCase())
      ) ||
      vehicle.price.toString().toLowerCase().includes(searchInput.toLowerCase())
  );

  // Function to sort vehicles in ascending order based on price
  const sortByLowToHigh = () => {
    let sortedVehicles = [...filteredVehicles];
    sortedVehicles.sort((a, b) => a.price - b.price);
    setVehicles(sortedVehicles);
    setSortOption("lowToHigh");
  };

  // Function to sort vehicles in descending order based on price
  const sortByHighToLow = () => {
    let sortedVehicles = [...filteredVehicles];
    sortedVehicles.sort((a, b) => b.price - a.price);
    setVehicles(sortedVehicles);
    setSortOption("highToLow");
  };
  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredVehicles.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredVehicles.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  let {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setSearchInput(searchInput + transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(function (error) {});
  const handleDropdownChange = ({ target }) => {
    if (target?.key === "places") {
      return setVehicles(
        props.filter((vehicle) => {
          return vehicle.places.some((place) => place.value === target?.value);
        })
      );
    }
    if (target?.key) {
      setVehicles(
        props.filter((vehicle) => {
          return vehicle[target?.key] === target?.value;
        })
      );
    }
    // setSearchInput(target.value)
    //    const result = vehicles.filter((vehicle) =>
    //   vehicle.places.some((place) =>
    //     place.value.toLowerCase().includes(event.target.value.toLowerCase())
    //   )
    // );
  };

  const items = [
    {
      label: "Sort",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Low To High",
          icon: "pi pi-fw pi-align-left",
          command: () => sortByLowToHigh(),
        },
        {
          label: "High To Low",
          icon: "pi pi-fw pi-align-right",
          command: () => sortByHighToLow(),
        },
      ],
    },
    {
      label: "Filter",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Places",
          icon: "pi pi-fw pi-pencil",
          items: uniquePlaces.map((place) => ({
            label: place.label,
            icon: "pi pi-fw pi-home",
            command: () =>
              handleDropdownChange({
                target: { value: place.label, key: "places" },
              }),
          })),
        },
        {
          label: "Category",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Manual",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "manual", key: "category" },
                }),
            },
            {
              label: "Automatic",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "automatic", key: "category" },
                }),
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
              command: () =>
                handleDropdownChange({
                  target: { value: "vintage", key: "segment" },
                }),
            },
            {
              label: "Premium",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "premium", key: "segment" },
                }),
            },
            {
              label: "Normal",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "normal", key: "segment" },
                }),
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
              command: () =>
                handleDropdownChange({
                  target: { value: "Sedan", key: "type" },
                }),
            },
            {
              label: "Hatchback",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "Hatchback", key: "type" },
                }),
            },
            {
              label: "SUV",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({ target: { value: "SUV", key: "type" } }),
            },
            {
              label: "Crossover",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "Crossover", key: "type" },
                }),
            },
            {
              label: "Coupe",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "Coupe", key: "type" },
                }),
            },
            {
              label: "Convertible",
              icon: "pi pi-fw pi-home",
              command: () =>
                handleDropdownChange({
                  target: { value: "Convertible", key: "type" },
                }),
            },
          ],
        },
      ],
    },
  ];

  const end = (
    <div className="">
      <InputText
        value={searchInput}
        onChange={handleSearchInputChange}
        placeholder="Search"
        type="text"
        className="w-full"
      />
      <span class="px-2">
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

  return (
    <section>
      <div class="row justify-content-center my-5 mx-3">
        <div class="">
          <div className="card">
            <Menubar model={items} end={end} />
          </div>
        </div>

        {/* <div style={{ height: "20vh" }}></div> */}

        {records.length > 0 ? (
          <div className={style.cardContainer}>
            {!!records.length &&
              [...records, ...records].map((x) => (
                <CarCard
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
          <img
          className={style.notFound}
            src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/no_result_still_2x.gif?compress=1&resize=400x300&vertical=top"
            alt=""
          />
        )}
      </div>
      {filteredVehicles.length > recordsPerPage && (
        <nav className="d-flex  justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" onClick={prevPage}>
                Prev
              </a>
            </li>
            {numbers.map((n, i) => {
              return (
                <li
                  className={`page-item ${currentPage === n && "active"}`}
                  key={i}
                >
                  <a
                    className="page-link"
                    onClick={() => {
                      changeCPage(n);
                    }}
                  >
                    {n}
                  </a>
                </li>
              );
            })}
            <li className="page-item">
              <a className="page-link" onClick={nextPage}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      )}
    </section>
  );

  function prevPage() {
    currentPage !== 1 && setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    currentPage !== npage && setCurrentPage(currentPage + 1);
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }
}
