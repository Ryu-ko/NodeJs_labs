-- CreateTable
CREATE TABLE "Pizzas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Pizzas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turtles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weaponId" INTEGER,
    "favoritePizzaId" INTEGER,
    "secondFavoritePizzaId" INTEGER,
    "color" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Turtles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Weapons" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dps" INTEGER NOT NULL,

    CONSTRAINT "Weapons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pizzas_name_key" ON "Pizzas"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Turtles_name_key" ON "Turtles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Weapons_name_key" ON "Weapons"("name");

-- AddForeignKey
ALTER TABLE "Turtles" ADD CONSTRAINT "Turtles_favoritePizzaId_fkey" FOREIGN KEY ("favoritePizzaId") REFERENCES "Pizzas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turtles" ADD CONSTRAINT "Turtles_secondFavoritePizzaId_fkey" FOREIGN KEY ("secondFavoritePizzaId") REFERENCES "Pizzas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turtles" ADD CONSTRAINT "Turtles_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Pizzas" ("name", "calories", "description") VALUES
    ('Mushroom', 900, 'Pizza topped with mushrooms and mozzarella cheese'),
    ('Four Cheese', 950, 'Pizza topped with four types of cheese: mozzarella, cheddar, parmesan, and gorgonzola'),
    ('BBQ Chicken', 1100, 'Pizza topped with BBQ sauce, grilled chicken, onions, and mozzarella cheese'),
    ('Supreme', 1050, 'Pizza with pepperoni, sausage, bell peppers, onions, olives, and mozzarella cheese'),
    ('Buffalo Chicken', 1000, 'Pizza topped with buffalo sauce, grilled chicken, red onions, and mozzarella cheese');


INSERT INTO "Weapons" ("name", "dps") VALUES
('Katana', 100),
('Nunchaku', 80),
('Bo Staff', 70),
('Sai', 90),
('Kusarigama', 110);

INSERT INTO "Turtles" ("name", "weaponId", "favoritePizzaId", "secondFavoritePizzaId", "color", "image") VALUES
('Leonardo', 1, 1, 1, 'Blue', 'leonardo.jpg'),
('Michelangelo', 2, 2, 2, 'Orange', 'michelangelo.jpg'),
('Donatello', 3, 3, 3, 'Purple', 'donatello.jpg'),
('Raphael', 4, 4, 4, 'Red', 'raphael.jpg'),
('Splinter', 5, 5, 5, 'Brown', 'splinter.jpg');

select * from "Turtles"