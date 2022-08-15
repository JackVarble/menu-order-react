import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-restaurantmenu-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong...");
      }

      const responseData = await response.json();

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setIsError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={classes.MealsError}>
        <p>{isError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meals) => {
    return (
      <MealItem
        id={meals.id}
        key={meals.id}
        name={meals.name}
        price={meals.price}
        description={meals.description}
      />
    );
  });

  return (
    <Card>
      <section className={classes.meals}>
        <ul>{mealsList}</ul>
      </section>
    </Card>
  );
};

export default AvailableMeals;
