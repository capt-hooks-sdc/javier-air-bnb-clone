

-- DROP DATABASE "reviews-service";
-- CREATE DATABASE "reviews-service";

DROP TABLE IF EXISTS "reviews";
DROP TABLE IF EXISTS "rentals";
DROP TABLE IF EXISTS "users";

CREATE TABLE "rentals" (
  "rental_id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "continent" TEXT NOT NULL,
  PRIMARY KEY ("rental_id")
);

CREATE TABLE "users" (
  "user_id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "avatar" TEXT NOT NULL,
  PRIMARY KEY ("user_id")
);


CREATE TABLE "reviews" (
  "review_id" SERIAL NOT NULL,
  "rental_id" INTEGER NOT NULL,
  "user_id" INTEGER NOT NULL,
  "timestamp" TEXT NOT NULL,
  "name" VARCHAR(40) NOT NULL,
  "avatar" TEXT NOT NULL,
  "review" TEXT NOT NULL,
  "cleanliness" INTEGER NOT NULL,
  "accuracy" INTEGER NOT NULL,
  "comm" INTEGER NOT NULL,
  "location" INTEGER NOT NULL,
  "check_in" INTEGER NOT NULL,
  "value" INTEGER NOT NULL,
  PRIMARY KEY ("review_id"),
  FOREIGN KEY ("rental_id")
    REFERENCES "rentals"("rental_id")
    ON DELETE CASCADE,
  FOREIGN KEY ("user_id")
    REFERENCES "users"("user_id")
    ON DELETE CASCADE
);
