DROP TABLE IF EXISTS testing.bank_data;
DROP TABLE IF EXISTS testing.bank_transaction;

CREATE SCHEMA testing;

CREATE TABLE testing.bank_data
(
  name text,
  last_name text,
  user_id serial NOT NULL,
  card_id text NOT NULL,
  cvv text,
  expiration_date date,
  balance numeric NOT NULL DEFAULT 0,
  CONSTRAINT pk_card_id PRIMARY KEY (card_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE testing.bank_data
  OWNER TO omarmhadden;

  CREATE TABLE testing.bank_transaction
  (
    transaction_date date,
    description text,
    balance_at money,
    transaction_id serial NOT NULL,
    card_id text,
    CONSTRAINT pk_transction_id PRIMARY KEY (transaction_id),
    CONSTRAINT fk_card_id FOREIGN KEY (card_id)
        REFERENCES testing.bank_data (card_id) MATCH SIMPLE
        ON UPDATE NO ACTION ON DELETE NO ACTION
  )
  WITH (
    OIDS=FALSE
  );
  ALTER TABLE testing.bank_transaction
    OWNER TO omarmhadden;
