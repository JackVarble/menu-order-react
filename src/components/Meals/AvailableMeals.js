import { useState, useEffect } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-restaurantmenu-default-rtdb.firebaseio.com/meals.json"
      );
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
    };

    fetchMeals();
  }, []);

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
