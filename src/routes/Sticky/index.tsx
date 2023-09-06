import {
  $,
  component$,
  useOnWindow,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Box } from "./box";
import type { sticky } from "./sticky";
import { Sticker } from "./sticky";
import style from "./stickyBoard.css?inline";

const addCart = $((card: sticky) => {
  card.id = Math.random().toString(36).substr(2, 9);
  card.updated = new Date();
  card.created = new Date();
  card.zIndex = 0;
  card.index = 0;
  card.draggable = true;
  card.height = 200;
  card.width = 200;

  const cards = localStorage.getItem("cards");

  if (cards) {
    const cardsParse = JSON.parse(cards);
    cardsParse.push(card);
    localStorage.setItem("cards", JSON.stringify(cardsParse));
  } else {
    localStorage.setItem("cards", JSON.stringify([card]));
  }

  return card;
});

const deleteCards = $(async (id: string) => {
  const cards = localStorage.getItem("cards");

  if (cards) {
    const cardsParse = JSON.parse(cards);
    const newCards = cardsParse.filter((card: sticky) => card.id !== id);
    localStorage.setItem("cards", JSON.stringify(newCards));
  }
});

const updateCart = $((card: Partial<sticky>) => {
  const cards = localStorage.getItem("cards");
  if (cards) {
    const cardsParse = JSON.parse(cards);
    const newCards = cardsParse.map((cart: sticky) => {
      if (cart.id === card.id) {
        return { ...cart, ...card };
      }
      return cart;
    });
    localStorage.setItem("cards", JSON.stringify(newCards));
  }
});

const getCards = $(async () => {
  const cards = await localStorage.getItem("cards");

  if (cards) {
    return JSON.parse(cards);
  }
  return [];
});

/* export const useGetCardsInitRoute = routeLoader$(async () => {
  return getCards();
});
 */
interface values {
  cards: sticky[];
  mouse: {
    Y: number;
    X: number;
  };
  cube: {
    value: number;
  };
}

const detectCollision = $((element1: Partial<sticky>, element2: sticky) => {
  // Comprueba si hay colisión en el eje X
  const collisionX = element1.axisX! === element2.axisX;

  // Comprueba si hay colisión en el eje Y
  const collisionY = element1.axisY! === element2.axisY;

  // Si hay colisión tanto en X como en Y, entonces los elementos están en colisión
  return collisionX && collisionY;
});

export default component$(() => {
  useStylesScoped$(style);

  const { cards, mouse, cube } = useStore<values>({
    cards: [],
    mouse: {
      Y: 0,
      X: 0,
    },
    cube: {
      value: 0,
    },
  });

  useVisibleTask$(async () => {
    const newCards = await getCards();
    console.log(newCards);

    if (newCards) {
      cards.push(...newCards);
    }
  });

  const create = $(async (color: sticky["color"]) => {
    const newCart = {
      color,
      axisX: 100,
      axisY: 100,
      content: "",
      draggable: true,
    };
    // Buscar un lugar vacío para el nuevo elemento.
    for (let i = 0; i < cards.length; i++) {
      if (await detectCollision(newCart, cards[i])) {
        console.log("hola2");
        // Si hay colisión, mover el nuevo elemento.
        // Aquí puedes implementar la lógica para encontrar un lugar vacío.
        // Por ejemplo, podrías simplemente incrementar las coordenadas.
        newCart.axisX += 210;
        //redonderar width al numero mas sercano para abajo

        if (newCart.axisX > cube.value * 210) {
          newCart.axisX = newCart.axisX - cube.value * 210;
          newCart.axisY += 210;
        }
      }
    }

    console.log(cards);

    const cart = await addCart(newCart as sticky);
    cards.push(cart);
  });

  useOnWindow(
    "resize",
    $(() => {
      cube.value = Math.floor((window.screen.width - 100) / 210);
    })
  );

  useOnWindow(
    "load",
    $(() => {
      cube.value = Math.floor((window.screen.width - 100) / 210);
    })
  );

  const colors: sticky["color"][] = ["#696CA3", "#D77AFF", "#FC70AE"];

  return (
    <div class="flex flex-col items-center ">
      <div class="flex justify-end w-full">
        {colors.map((color) => (
          <Box color={color} key={color} onClick$={$(() => create(color))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </Box>
        ))}
      </div>

      <div>
        {cards.map((card, key) => (
          <span
            style={{
              cursor: "move",
              position: "absolute",
              top: `${card.axisY}px`,
              left: `${card.axisX}px`,
            }}
            class="relative"
            key={card.id}
            draggable={card.draggable}
            preventdefault:dragover
            preventdefault:drop
            onDragStart$={(event) => {
              mouse.X = event.clientX - card.axisX;
              mouse.Y = event.clientY - card.axisY;
            }}
            onDrag$={(event) => {
              if (!(event.clientX !== 0 && event.clientY !== 0)) return;
              card.axisX = event.clientX - mouse.X;
              card.axisY = event.clientY - mouse.Y;
            }}
            onDragEnd$={async () => {
              await updateCart({
                id: card.id,
                axisX: card.axisX,
                axisY: card.axisY,
              });
            }}
          >
            <button
              onClick$={async () => {
                await updateCart({
                  id: card.id,
                  draggable: !card.draggable,
                });

                card.draggable = !card.draggable;
              }}
              title="draggable"
            >
              {card.draggable ? "🔥" : "📛"}
            </button>
            <Sticker
              card={card}
              delete$={$(async () => {
                await deleteCards(card.id);
                cards.splice(key, 1);
              })}
              saveText$={$(() => {
                updateCart({
                  id: card.id,
                  content: card.content,
                  height: card.height,
                  width: card.width,
                });
              })}
            />
          </span>
        ))}
      </div>
    </div>
  );
});
