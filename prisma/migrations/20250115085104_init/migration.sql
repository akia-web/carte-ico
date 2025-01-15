-- CreateTable
CREATE TABLE "card" (
    "id" BIGSERIAL NOT NULL,
    "type" VARCHAR,
    "name" VARCHAR,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_description" (
    "id" BIGSERIAL NOT NULL,
    "description" TEXT,
    "card_id" BIGINT,

    CONSTRAINT "card_description_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_num_by_player" (
    "id" BIGSERIAL NOT NULL,
    "card_id" BIGINT,
    "player_num_id" BIGINT,
    "quantity" BIGINT,

    CONSTRAINT "card_num_by_player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "player_number" (
    "id" BIGSERIAL NOT NULL,
    "number" BIGINT,

    CONSTRAINT "player_number_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "last_connection" TIMESTAMP(6),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stat" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" BIGINT,
    "num_game" BIGINT,
    "num_win" BIGINT,

    CONSTRAINT "user_stat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "card_description" ADD CONSTRAINT "card_description_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_num_by_player" ADD CONSTRAINT "card_num_by_player_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "card_num_by_player" ADD CONSTRAINT "card_num_by_player_player_num_id_fkey" FOREIGN KEY ("player_num_id") REFERENCES "player_number"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_stat" ADD CONSTRAINT "user_stat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
