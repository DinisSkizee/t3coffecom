import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Macchiato from "../components/svg/Coffee/Macchiato";
import Espresso from "../components/svg/Coffee/Espresso";
import Mocha from "../components/svg/Coffee/Mocha";
import Latte from "../components/svg/Coffee/Latte";
import Cappuccino from "../components/svg/Coffee/Cappuccino";
import Link from "next/link";
import ThinBrownLine from "../components/ThinBrownLine";
import SmallMacchiato from "../components/svg/CoffeeSize/Macchiato/SmallMacchiato";
import LargeMacchiato from "../components/svg/CoffeeSize/Macchiato/LargeMacchiato";
import MediumMacchiato from "../components/svg/CoffeeSize/Macchiato/MediumMacchiato";
import LargeLatte from "../components/svg/CoffeeSize/Latte/LargeLatte";
import LargeMocha from "../components/svg/CoffeeSize/Mocha/LargeMocha";
import LargeEspresso from "../components/svg/CoffeeSize/Espresso/LargeEspresso";
import MediumMocha from "../components/svg/CoffeeSize/Mocha/MediumMocha";
import MediumEspresso from "../components/svg/CoffeeSize/Espresso/MediumEspresso";
import MediumLatte from "../components/svg/CoffeeSize/Latte/MediumLatte";
import SmallLatte from "../components/svg/CoffeeSize/Latte/SmallLatte";
import SmallMocha from "../components/svg/CoffeeSize/Mocha/SmallMocha";
import SmallEspresso from "../components/svg/CoffeeSize/Espresso/SmallEspresso";
import BackArrow from "../components/svg/BackArrow";
import NoSugar from "../components/svg/SugarSize/NoSugar";
import SmallSugar from "../components/svg/SugarSize/SmallSugar";
import MediumSugar from "../components/svg/SugarSize/MediumSugar";
import LargeSugar from "../components/svg/SugarSize/LargeSugar";
import Cream from "../components/svg/Additions/Cream";
import Vanilla from "../components/svg/Additions/Vanilla";
import Footer from "../components/Footer";
import Basket from "../components/Basket";
import SmallCappuccino from "../components/svg/CoffeeSize/Cappuccino/SmallCappuccino";
import MediumCappuccino from "../components/svg/CoffeeSize/Cappuccino/MediumCappuccino";
import LargeCappuccino from "../components/svg/CoffeeSize/Cappuccino/LargeCappuccino";
import { useGetProductsQuery } from "~/gql/schema";

const DrinkBackground = ({ drink }: { drink: string }) => {
  return (
    <div className="flex h-[210px] items-center justify-center bg-background-light">
      {drink === "Macchiato" && (
        <Macchiato className="h-[100px] drop-shadow-strDrop" />
      )}
      {drink === "Espresso" && (
        <Espresso className="h-[100px] drop-shadow-strDrop" />
      )}
      {drink === "Mocha" && <Mocha className="h-[100px] drop-shadow-strDrop" />}
      {drink === "Latte" && <Latte className="h-[100px] drop-shadow-strDrop" />}
      {drink === "Cappuccino" && (
        <Cappuccino className="h-[85px] drop-shadow-strDrop" />
      )}
    </div>
  );
};

interface DetailsProps {
  drinkName: string;
  drinkPrice: number;
  drinkAmount: number;
  decreaseDrinkAmount: () => void;
  increaseDrinkAmount: () => void;
}
const DrinkDetails = ({
  drinkName,
  drinkPrice,
  decreaseDrinkAmount,
  drinkAmount,
  increaseDrinkAmount,
}: DetailsProps) => {
  return (
    <div className="mx-6 my-4 flex flex-row">
      <div className="flex flex-col">
        <div className="text-[20px] font-bold text-[#2D140D]">{drinkName}</div>
        <div className="text-[18px] text-[#383537]">
          {Number(drinkPrice).toFixed(2)} GBP
        </div>
      </div>
      <div className="ml-auto flex flex-row items-center gap-4">
        <div className="text-[26px] text-[#383537]">{drinkAmount}</div>
        <div className="flex h-[34px] w-[105px] flex-row justify-between gap-2">
          {/* ADD */}
          <div
            className="flex w-full items-center justify-center rounded-l-full border border-[#2D140D] text-[39px] hover:bg-[#B98068] hover:drop-shadow-md"
            onClick={decreaseDrinkAmount}
          >
            <svg
              width="13"
              height="3"
              viewBox="0 0 13 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13 2.73145V0.674805H0.101562V2.73145H13Z"
                fill="#2D140D"
              />
            </svg>
          </div>
          {/* REMOVE */}
          <div
            className="flex w-full items-center justify-center rounded-r-full border border-[#2D140D] text-[32px] hover:bg-[#B98068] hover:drop-shadow-md"
            onClick={increaseDrinkAmount}
          >
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.47754 7.73145V13.5459H5.4209V7.73145H0V5.6748H5.4209V0H7.47754V5.6748H12.8984V7.73145H7.47754Z"
                fill="#2D140D"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

interface SizeProps {
  newDrinkSize: (size: number) => void;
  opacities: number[];
  drinkName: string;
}
const DrinkSize = ({ newDrinkSize, opacities, drinkName }: SizeProps) => {
  const [opacitiesSizeHover, setOpacitiesSizeHover] = useState([...opacities]);
  useEffect(() => {
    setOpacitiesSizeHover(opacities);
  }, [opacities]);

  const updateOpacitiesOne = (index: number) => {
    const updatedOpacities = [...opacities];
    updatedOpacities[index] = 1;
    setOpacitiesSizeHover(updatedOpacities);
  };
  const updateOpacitiesZero = (index: number) => {
    if (opacities[index] !== 1) {
      const updatedOpacities = [...opacities];
      updatedOpacities[index] = 0.4;
      setOpacitiesSizeHover(updatedOpacities);
    }
  };
  return (
    <div className="mx-6 my-5 flex flex-row items-center">
      <div className="text-[20px] text-[#715D55]">Size</div>
      <div className="m-auto flex w-[60%] flex-row items-end justify-evenly">
        {/* SMALL CUP */}
        <div
          onClick={() => newDrinkSize(0)}
          onMouseEnter={() => updateOpacitiesOne(0)}
          onMouseLeave={() => updateOpacitiesZero(0)}
        >
          {opacitiesSizeHover[0] && (
            <>
              {drinkName === "Latte" ? (
                <SmallLatte opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Cappuccino" ? (
                <SmallCappuccino opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Mocha" ? (
                <SmallMocha opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Espresso" ? (
                <SmallEspresso opacities={opacitiesSizeHover[0]} />
              ) : drinkName === "Macchiato" ? (
                <SmallMacchiato opacities={opacitiesSizeHover[0]} />
              ) : (
                <SmallMacchiato opacities={opacitiesSizeHover[0]} />
              )}
            </>
          )}
        </div>
        {/* MEDIUM CUP */}
        <div
          onClick={() => newDrinkSize(1)}
          onMouseEnter={() => updateOpacitiesOne(1)}
          onMouseLeave={() => updateOpacitiesZero(1)}
        >
          {opacitiesSizeHover[1] && (
            <>
              {drinkName === "Latte" ? (
                <MediumLatte opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Cappuccino" ? (
                <MediumCappuccino opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Mocha" ? (
                <MediumMocha opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Espresso" ? (
                <MediumEspresso opacities={opacitiesSizeHover[1]} />
              ) : drinkName === "Macchiato" ? (
                <MediumMacchiato opacities={opacitiesSizeHover[1]} />
              ) : (
                <MediumMacchiato opacities={opacitiesSizeHover[1]} />
              )}
            </>
          )}
        </div>
        {/* LARGE CUP */}
        <div
          onClick={() => newDrinkSize(2)}
          onMouseEnter={() => updateOpacitiesOne(2)}
          onMouseLeave={() => updateOpacitiesZero(2)}
        >
          {opacitiesSizeHover[2] && (
            <>
              {drinkName === "Latte" ? (
                <LargeLatte opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Cappuccino" ? (
                <LargeCappuccino opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Mocha" ? (
                <LargeMocha opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Espresso" ? (
                <LargeEspresso opacities={opacitiesSizeHover[2]} />
              ) : drinkName === "Macchiato" ? (
                <LargeMacchiato opacities={opacitiesSizeHover[2]} />
              ) : (
                <LargeMacchiato opacities={opacitiesSizeHover[2]} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface SugarProps {
  newSugarAmount: (amount: number) => void;
  opacitiesSugar: number[];
}
const SugarAmount = ({ newSugarAmount, opacitiesSugar }: SugarProps) => {
  const [opacitiesSugarHover, setOpacitiesSugarHover] = useState([
    ...opacitiesSugar,
  ]);
  useEffect(() => {
    setOpacitiesSugarHover(opacitiesSugar);
  }, [opacitiesSugar]);

  const updateOpacitiesOne = (index: number) => {
    const updatedOpacities = [...opacitiesSugar];
    updatedOpacities[index] = 1;
    setOpacitiesSugarHover(updatedOpacities);
  };
  const updateOpacitiesZero = (index: number) => {
    if (opacitiesSugar[index] !== 1) {
      const updatedOpacities = [...opacitiesSugar];
      updatedOpacities[index] = 0.4;
      setOpacitiesSugarHover(updatedOpacities);
    }
  };
  return (
    <>
      <div className="m-6 flex flex-row items-center">
        <div className="text-[20px] text-[#715D55]">Sugar</div>
        <div className="m-auto flex w-[60%] flex-row items-center justify-evenly">
          {opacitiesSugarHover[0] && (
            <div
              onClick={() => newSugarAmount(0)}
              onMouseEnter={() => updateOpacitiesOne(0)}
              onMouseLeave={() => updateOpacitiesZero(0)}
            >
              <NoSugar opacitiesSugar={opacitiesSugarHover[0]} />
            </div>
          )}
          {opacitiesSugarHover[1] && (
            <div
              onClick={() => newSugarAmount(1)}
              onMouseEnter={() => updateOpacitiesOne(1)}
              onMouseLeave={() => updateOpacitiesZero(1)}
            >
              <SmallSugar opacitiesSugar={opacitiesSugarHover[1]} />
            </div>
          )}
          {opacitiesSugarHover[2] && (
            <div
              onClick={() => newSugarAmount(2)}
              onMouseEnter={() => updateOpacitiesOne(2)}
              onMouseLeave={() => updateOpacitiesZero(2)}
            >
              <MediumSugar opacitiesSugar={opacitiesSugarHover[2]} />
            </div>
          )}
          {opacitiesSugarHover[3] && (
            <div
              onClick={() => newSugarAmount(3)}
              onMouseEnter={() => updateOpacitiesOne(3)}
              onMouseLeave={() => updateOpacitiesZero(3)}
            >
              <LargeSugar opacitiesSugar={opacitiesSugarHover[3]} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface AdditionsProps {
  manageAdditions: (item: number) => void;
  opacitiesAdditions: number[];
}
const Additions = ({ manageAdditions, opacitiesAdditions }: AdditionsProps) => {
  const [opacitiesAdditionsHover, setOpacitiesAdditionsHover] = useState([
    ...opacitiesAdditions,
  ]);
  useEffect(() => {
    setOpacitiesAdditionsHover(opacitiesAdditions);
  }, [opacitiesAdditions]);

  const updateOpacitiesOne = (index: number) => {
    const updatedOpacities = [...opacitiesAdditions];
    updatedOpacities[index] = 1;
    setOpacitiesAdditionsHover(updatedOpacities);
  };
  const updateOpacitiesZero = (index: number) => {
    if (opacitiesAdditions[index] !== 1) {
      const updatedOpacities = [...opacitiesAdditions];
      updatedOpacities[index] = 0.4;
      setOpacitiesAdditionsHover(updatedOpacities);
    }
  };
  return (
    <div className="m-6 flex flex-row items-center">
      <div className="text-[20px] text-[#715D55]">Additions</div>
      <div className="m-auto ml-2 flex w-[60%] flex-row items-center justify-evenly">
        <div
          onClick={() => manageAdditions(0)}
          onMouseEnter={() => updateOpacitiesOne(0)}
          onMouseLeave={() => updateOpacitiesZero(0)}
        >
          {opacitiesAdditionsHover[0] && (
            <Cream opacitiesAdditions={opacitiesAdditionsHover[0]} />
          )}
        </div>
        <div
          onClick={() => manageAdditions(1)}
          onMouseEnter={() => updateOpacitiesOne(1)}
          onMouseLeave={() => updateOpacitiesZero(1)}
        >
          {opacitiesAdditionsHover[1] && (
            <Vanilla opacitiesAdditions={opacitiesAdditionsHover[1]} />
          )}
        </div>
      </div>
    </div>
  );
};

const Total = ({ totalAmount }: { totalAmount: number }) => {
  return (
    <div className="m-6 flex text-[28px]">
      <div className="text-[#8C746A]">Total:</div>
      <div className="ml-auto text-[30px] font-semibold text-[#2D140D]">
        {Number(totalAmount)?.toFixed(2)}
        <span className="ml-1 text-[20px] font-extrabold">GBP</span>
      </div>
    </div>
  );
};

interface CartButtonProps {
  setBasketAmount: (basketAmount: number) => void;
  basketAmount: number;
}
const CartButton = ({ setBasketAmount, basketAmount }: CartButtonProps) => {
  const [cartOpacity, setCartOpacity] = useState(0);
  const [displayText, setDisplayText] = useState("Add To Cart");

  const handleButtonClick = () => {
    setBasketAmount(basketAmount + 1);
    setDisplayText("Added");
    setCartOpacity(1);

    setTimeout(() => {
      setCartOpacity(0);
      setDisplayText("Add To Cart");
    }, 500);
  };

  const instantCartStyle = {
    opacity: cartOpacity === 0 ? 0 : 1,
  };
  const cartStyle = {
    opacity: cartOpacity,
    transition: "0.3s ease-in",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="flex w-[90%] items-center justify-center rounded-full bg-[#B98068] py-3.5 text-white"
        onClick={handleButtonClick}
      >
        {displayText}
        <div
          className="pl-4"
          style={cartOpacity === 0 ? instantCartStyle : cartStyle}
        >
          <svg
            width="18"
            height="16"
            viewBox="0 0 18 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 9.70676L4.65 13.5712C4.7555 13.7018 4.8904 13.8081 5.04474 13.8823C5.19908 13.9565 5.36891 13.9966 5.54169 13.9998C5.71448 14.003 5.8858 13.9691 6.04302 13.9006C6.20023 13.8321 6.33931 13.7308 6.45 13.6042L16.5 2"
              stroke="#F8E9D6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
}

interface MoneyV2 {
  amount: number;
}

const PreferencesPage = () => {
  const router = useRouter();

  // Get the query parameter from the URL
  const { drink } = router.query;

  const [drinkVariant, setDrinkVariant] = useState<ProductVariant | undefined>(
    undefined,
  );
  const [drinkName, setDrinkName] = useState("");
  const [drinkPrice, setDrinkPrice] = useState(0.0);
  const [drinkAmount, setDrinkAmount] = useState(0);
  const [drinkSize, setDrinkSize] = useState(1);
  const [opacitiesSize, setOpacitiesSize] = useState([0.4, 1, 0.4]);
  const [sugarAmount, setSugarAmount] = useState(0);
  const [opacitiesSugar, setOpacitiesSugar] = useState([1, 0.4, 0.4, 0.4]);
  const [additions, setAdditions] = useState<Record<string, number>>({
    Cream: 0,
    Vanilla: 0,
  });
  const [opacitiesAdditions, setOpacitiesAdditions] = useState([0.4, 0.4]);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [basketAmount, setBasketAmount] = useState(0);

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    variables: {
      first: 100,
    },
  });

  useEffect(() => {
    if (typeof drink === "string") {
      setDrinkName(drink);
    } else {
      setDrinkName("No drink parameter found");
    }
  }, [drink]);

  useEffect(() => {
    if (!productsData) return;

    const sizeMapping: Record<number, string> = {
      0: "Small",
      1: "Medium",
      2: "Large",
    };

    const filteredProduct = productsData.products.edges.find(
      (edge) => edge.node.title === drinkName,
    );

    const filteredVariantName = filteredProduct?.node.variants.edges.filter(
      (variant) =>
        variant.node.title.includes(sizeMapping[drinkSize] ?? "Medium"),
    );

    console.log(additions);
    const activeAdditions = Object.keys(additions).filter(
      (key) => additions[key] === 1,
    );

    const filteredVariant = filteredVariantName?.find((variant) => {
      if (
        activeAdditions.includes("Cream") &&
        activeAdditions.includes("Vanilla")
      ) {
        return variant.node.title.includes("Vanilla & Cream");
      } else if (activeAdditions.includes("Cream")) {
        return variant.node.title.includes("Cream");
      } else if (activeAdditions.includes("Vanilla")) {
        return variant.node.title.includes("Vanilla");
      } else {
        return variant.node.title.includes("Normal");
      }
    });

    if (filteredVariant) {
      setDrinkVariant(filteredVariant.node);
      setTotalAmount(
        (filteredVariant.node.price.amount as number) * drinkAmount,
      );
      setDrinkPrice(filteredVariant.node.price.amount as number);
    }
    console.log("filteredVariant", filteredVariant);
  }, [productsData, drinkSize, additions, drinkName, drinkAmount]);

  const increaseDrinkAmount = () => {
    setDrinkAmount(drinkAmount + 1);
  };
  const decreaseDrinkAmount = () => {
    if (drinkAmount > 0) setDrinkAmount(drinkAmount - 1);
  };
  const newDrinkSize = (size: number) => {
    setDrinkSize(size);

    const updatedOpacities = opacitiesSize.map((_, i) =>
      i === size ? 1 : 0.4,
    );
    setOpacitiesSize(updatedOpacities);
  };
  const newSugarAmount = (amount: number) => {
    setSugarAmount(amount);

    const updatedOpacities = opacitiesSugar.map((_, i) =>
      i === amount ? 1 : 0.4,
    );
    setOpacitiesSugar(updatedOpacities);
  };
  const manageAdditions = (item: number) => {
    const extra = item === 0 ? "Cream" : "Vanilla";
    const updatedAdditions = {
      ...additions,
      [extra]: additions[extra] === 1 ? 0 : 1,
    };

    setAdditions(updatedAdditions);

    const updatedAdditionsOpacities = opacitiesAdditions.map((value, i) =>
      i === item ? (value === 1 ? 0.4 : 1) : value,
    );
    setOpacitiesAdditions(updatedAdditionsOpacities);
  };

  const title = "Preferences " + drinkName;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex w-full justify-center">
        <div className="flex h-screen w-[414px] flex-col bg-white">
          <Header />
          <div className="my-1 flex flex-col">
            {/* Preferences header */}
            <div className="mx-7 mb-2 flex items-center">
              <Link href={"/selectDrink"}>
                <BackArrow />
              </Link>
              <div className="m-auto my-2 text-[24px] text-[#8C746A]">
                Preferences
              </div>
              <Basket basketAmount={basketAmount} />
            </div>
            {/* Bg & Icon */}
            {drink && <DrinkBackground drink={drinkName} />}

            {/* Coffee Details */}
            <DrinkDetails
              increaseDrinkAmount={increaseDrinkAmount}
              decreaseDrinkAmount={decreaseDrinkAmount}
              drinkAmount={drinkAmount}
              drinkPrice={drinkPrice}
              drinkName={drinkName}
            />
            <ThinBrownLine />

            {/* Size */}
            <DrinkSize
              drinkName={drinkName}
              opacities={opacitiesSize}
              newDrinkSize={newDrinkSize}
            />
            <ThinBrownLine />

            {/* Sugar */}
            <SugarAmount
              newSugarAmount={newSugarAmount}
              opacitiesSugar={opacitiesSugar}
            />
            <ThinBrownLine />

            {/* Additions */}
            <Additions
              manageAdditions={manageAdditions}
              opacitiesAdditions={opacitiesAdditions}
            />
            <ThinBrownLine />

            {/* Total */}
            <Total totalAmount={totalAmount} />

            {/* Add To Cart */}
            <CartButton
              setBasketAmount={setBasketAmount}
              basketAmount={basketAmount}
            />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PreferencesPage;
