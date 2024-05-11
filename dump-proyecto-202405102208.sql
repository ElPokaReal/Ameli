PGDMP              
        |            proyecto    16.3    16.3 +    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    49603    proyecto    DATABASE     {   CREATE DATABASE proyecto WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE proyecto;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            �            1259    49604    beneficiarios    TABLE     �   CREATE TABLE public.beneficiarios (
    idbene integer NOT NULL,
    nombre character varying(20) NOT NULL,
    apellido character varying(20) NOT NULL,
    cedula character varying(11) NOT NULL,
    email character varying(50) NOT NULL
);
 !   DROP TABLE public.beneficiarios;
       public         heap    postgres    false    4            �            1259    49607    beneficiarios_idbene_seq    SEQUENCE     �   CREATE SEQUENCE public.beneficiarios_idbene_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.beneficiarios_idbene_seq;
       public          postgres    false    4    215            �           0    0    beneficiarios_idbene_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.beneficiarios_idbene_seq OWNED BY public.beneficiarios.idbene;
          public          postgres    false    216            �            1259    49608    cargos    TABLE     e   CREATE TABLE public.cargos (
    idcargo integer NOT NULL,
    nombre_cargo character varying(20)
);
    DROP TABLE public.cargos;
       public         heap    postgres    false    4            �            1259    49656    ordenes_pago    TABLE     	  CREATE TABLE public.ordenes_pago (
    id integer NOT NULL,
    financiamiento character varying(255) NOT NULL,
    razon_social character varying(255) NOT NULL,
    rif_ci character varying(20) NOT NULL,
    direccion text NOT NULL,
    concepto text NOT NULL,
    tipo_op integer NOT NULL,
    seguro_social_obligatorio numeric(10,2) NOT NULL,
    seguro_para_forzoso numeric(10,2) NOT NULL,
    fondo_jubilacion numeric(10,2) NOT NULL,
    faov numeric(10,2) NOT NULL,
    retencion_iva numeric(10,2) NOT NULL,
    retencion_timbre_fiscal numeric(10,2) NOT NULL,
    total_retenciones numeric(10,2) NOT NULL,
    monto_neto_pagar numeric(10,2) NOT NULL,
    monto_bs_letras text NOT NULL,
    cargo_banco character varying(255) NOT NULL,
    total numeric(10,2) NOT NULL
);
     DROP TABLE public.ordenes_pago;
       public         heap    postgres    false    4            �            1259    49655    ordenes_pago_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ordenes_pago_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.ordenes_pago_id_seq;
       public          postgres    false    4    223            �           0    0    ordenes_pago_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.ordenes_pago_id_seq OWNED BY public.ordenes_pago.id;
          public          postgres    false    222            �            1259    49619    proveedores    TABLE     �   CREATE TABLE public.proveedores (
    idpro integer NOT NULL,
    nombre character varying(20) NOT NULL,
    apellido character varying(20) NOT NULL,
    cedula character varying(11) NOT NULL,
    email character varying(50) NOT NULL
);
    DROP TABLE public.proveedores;
       public         heap    postgres    false    4            �            1259    49622    proveedores_idpro_seq    SEQUENCE     �   CREATE SEQUENCE public.proveedores_idpro_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.proveedores_idpro_seq;
       public          postgres    false    4    218            �           0    0    proveedores_idpro_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.proveedores_idpro_seq OWNED BY public.proveedores.idpro;
          public          postgres    false    219            �            1259    49623    usuario    TABLE     /  CREATE TABLE public.usuario (
    idusuario integer NOT NULL,
    nombre character varying(20) NOT NULL,
    apellido character varying(20) NOT NULL,
    cedula character varying(8) NOT NULL,
    email character varying(30) NOT NULL,
    password character varying(255) NOT NULL,
    idcargo integer
);
    DROP TABLE public.usuario;
       public         heap    postgres    false    4            �            1259    49626    usuario_idusuario_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.usuario_idusuario_seq;
       public          postgres    false    220    4            �           0    0    usuario_idusuario_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.usuario_idusuario_seq OWNED BY public.usuario.idusuario;
          public          postgres    false    221            -           2604    49627    beneficiarios idbene    DEFAULT     |   ALTER TABLE ONLY public.beneficiarios ALTER COLUMN idbene SET DEFAULT nextval('public.beneficiarios_idbene_seq'::regclass);
 C   ALTER TABLE public.beneficiarios ALTER COLUMN idbene DROP DEFAULT;
       public          postgres    false    216    215            0           2604    49659    ordenes_pago id    DEFAULT     r   ALTER TABLE ONLY public.ordenes_pago ALTER COLUMN id SET DEFAULT nextval('public.ordenes_pago_id_seq'::regclass);
 >   ALTER TABLE public.ordenes_pago ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            .           2604    49631    proveedores idpro    DEFAULT     v   ALTER TABLE ONLY public.proveedores ALTER COLUMN idpro SET DEFAULT nextval('public.proveedores_idpro_seq'::regclass);
 @   ALTER TABLE public.proveedores ALTER COLUMN idpro DROP DEFAULT;
       public          postgres    false    219    218            /           2604    49632    usuario idusuario    DEFAULT     v   ALTER TABLE ONLY public.usuario ALTER COLUMN idusuario SET DEFAULT nextval('public.usuario_idusuario_seq'::regclass);
 @   ALTER TABLE public.usuario ALTER COLUMN idusuario DROP DEFAULT;
       public          postgres    false    221    220            �          0    49604    beneficiarios 
   TABLE DATA           P   COPY public.beneficiarios (idbene, nombre, apellido, cedula, email) FROM stdin;
    public          postgres    false    215   �3       �          0    49608    cargos 
   TABLE DATA           7   COPY public.cargos (idcargo, nombre_cargo) FROM stdin;
    public          postgres    false    217   �3       �          0    49656    ordenes_pago 
   TABLE DATA           (  COPY public.ordenes_pago (id, financiamiento, razon_social, rif_ci, direccion, concepto, tipo_op, seguro_social_obligatorio, seguro_para_forzoso, fondo_jubilacion, faov, retencion_iva, retencion_timbre_fiscal, total_retenciones, monto_neto_pagar, monto_bs_letras, cargo_banco, total) FROM stdin;
    public          postgres    false    223   �3       �          0    49619    proveedores 
   TABLE DATA           M   COPY public.proveedores (idpro, nombre, apellido, cedula, email) FROM stdin;
    public          postgres    false    218   I4       �          0    49623    usuario 
   TABLE DATA           `   COPY public.usuario (idusuario, nombre, apellido, cedula, email, password, idcargo) FROM stdin;
    public          postgres    false    220   f4       �           0    0    beneficiarios_idbene_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.beneficiarios_idbene_seq', 4, true);
          public          postgres    false    216            �           0    0    ordenes_pago_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ordenes_pago_id_seq', 2, true);
          public          postgres    false    222            �           0    0    proveedores_idpro_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.proveedores_idpro_seq', 1, false);
          public          postgres    false    219            �           0    0    usuario_idusuario_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.usuario_idusuario_seq', 4, true);
          public          postgres    false    221            2           2606    49634 &   beneficiarios beneficiarios_cedula_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.beneficiarios
    ADD CONSTRAINT beneficiarios_cedula_key UNIQUE (cedula);
 P   ALTER TABLE ONLY public.beneficiarios DROP CONSTRAINT beneficiarios_cedula_key;
       public            postgres    false    215            4           2606    49636 %   beneficiarios beneficiarios_email_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.beneficiarios
    ADD CONSTRAINT beneficiarios_email_key UNIQUE (email);
 O   ALTER TABLE ONLY public.beneficiarios DROP CONSTRAINT beneficiarios_email_key;
       public            postgres    false    215            6           2606    49638     beneficiarios beneficiarios_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.beneficiarios
    ADD CONSTRAINT beneficiarios_pkey PRIMARY KEY (idbene);
 J   ALTER TABLE ONLY public.beneficiarios DROP CONSTRAINT beneficiarios_pkey;
       public            postgres    false    215            8           2606    49640    cargos cargos_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.cargos
    ADD CONSTRAINT cargos_pkey PRIMARY KEY (idcargo);
 <   ALTER TABLE ONLY public.cargos DROP CONSTRAINT cargos_pkey;
       public            postgres    false    217            F           2606    49663    ordenes_pago ordenes_pago_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.ordenes_pago
    ADD CONSTRAINT ordenes_pago_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.ordenes_pago DROP CONSTRAINT ordenes_pago_pkey;
       public            postgres    false    223            :           2606    49644 "   proveedores proveedores_cedula_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_cedula_key UNIQUE (cedula);
 L   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT proveedores_cedula_key;
       public            postgres    false    218            <           2606    49646 !   proveedores proveedores_email_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_email_key UNIQUE (email);
 K   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT proveedores_email_key;
       public            postgres    false    218            >           2606    49648    proveedores proveedores_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (idpro);
 F   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT proveedores_pkey;
       public            postgres    false    218            @           2606    49650    usuario usuario_cedula_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_cedula_key UNIQUE (cedula);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_cedula_key;
       public            postgres    false    220            B           2606    49652    usuario usuario_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_key;
       public            postgres    false    220            D           2606    49654    usuario usuario_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (idusuario);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    220            �   0   x�3������t�O�44261��rS�SR+srR���s�b���� �.      �      x������ � �      �   S   x�3�,I-.
F��F�&��9�
��E�%��y�
ũ����z@Yidf�� �DX¹ə�y@}@- =\F46?F��� �+X      �      x������ � �      �   �   x�e��r�0 �u���`�]c+>J���3��+\� M�������=�C	�-�V��	,������QhuP���|�C>��L�ż��&6���=]vr+�Y��9��*���Kň�f>�~�E$�Pi�S�bGF!�B.��A���������-k���%:`�a�
�����5�[�wU��%�������}�y��CI%     