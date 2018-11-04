--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.9
-- Dumped by pg_dump version 9.6.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id character varying NOT NULL,
    url character varying(2083) NOT NULL,
    note_id integer
);


ALTER TABLE public.image OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_id_seq OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- Name: note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.note (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    person_id integer NOT NULL
);


ALTER TABLE public.note OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.note_id_seq OWNER TO postgres;

--
-- Name: note_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.note_id_seq OWNED BY public.note.id;


--
-- Name: person; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.person (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    username character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    password character varying(60) NOT NULL
);


ALTER TABLE public.person OWNER TO postgres;

--
-- Name: person_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.person_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.person_id_seq OWNER TO postgres;

--
-- Name: person_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.person_id_seq OWNED BY public.person.id;


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- Name: note id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note ALTER COLUMN id SET DEFAULT nextval('public.note_id_seq'::regclass);


--
-- Name: person id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person ALTER COLUMN id SET DEFAULT nextval('public.person_id_seq'::regclass);


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.image VALUES ('1', 'https://github.com/vitaly-t/pg-promise/wiki/Learn-by-Exampless', 5);
INSERT INTO public.image VALUES ('2', 'http://localhost:8000/image2', 5);


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq', 2, true);


--
-- Data for Name: note; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.note VALUES (5, 'updated from postman', 'jeje', 1);


--
-- Name: note_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.note_id_seq', 9, true);


--
-- Data for Name: person; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.person VALUES (9, 'f@goog.com', 'febritos', 'Carlos', 'Febres', '123');
INSERT INTO public.person VALUES (1, 'elio@gmail.com', 'eliobricenov', 'Elio', 'Briceño', '123');
INSERT INTO public.person VALUES (10, 'nestor09amesty@gmail.com', 'namesty', 'Nestor', 'Amesty', '12345678a');
INSERT INTO public.person VALUES (11, 'eliobricenov@gmail.com', 'eliobv', 'Elio', 'Briceno', '12345678a');
INSERT INTO public.person VALUES (12, 'x@gmail.com', 'eloo', 'awda', 'asdasd', '12345678a');
INSERT INTO public.person VALUES (13, 'cfebres@gmail.com', 'carlosf', 'carlos', 'febres', '12345678a');
INSERT INTO public.person VALUES (14, 'p@gmail.com', 'prueba', 'pr', 'pr', '12345678a');


--
-- Name: person_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.person_id_seq', 14, true);


--
-- Name: image image_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pk PRIMARY KEY (id);


--
-- Name: note note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (id);


--
-- Name: person person_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.person
    ADD CONSTRAINT person_pk PRIMARY KEY (id);


--
-- Name: email_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX email_unique ON public.person USING btree (email);


--
-- Name: username_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX username_unique ON public.person USING btree (username);


--
-- Name: image image_note_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_note_id_fk FOREIGN KEY (note_id) REFERENCES public.note(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: note note_person_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.note
    ADD CONSTRAINT note_person_fk FOREIGN KEY (person_id) REFERENCES public.person(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

