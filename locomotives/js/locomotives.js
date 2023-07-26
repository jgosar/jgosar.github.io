const data = `ID	Prevoznik	Serija	Država	Proizvajalec	Posebnosti	Slike
1	FS	E656	it	Lima		20230415_093257,20230415_093331
2	SŽ	813/814	si	Rivarossi,Ročno		20230415_093616,20230415_093642
3	SŽ	311/315	si	Ročno		20230415_093836,20230415_094021,20230415_094041
4	SŽ	713/715	si	Roco,Ročno		20230415_094153,20230415_094207
5	DB	55	de	Piko	Digital,Sound	20230415_094436,20230415_094448
6	FS	214	it	Roco		20230415_095827,20230415_095836
7	DB	182	de	Piko	Poškodovana pantografa	20230415_100132,20230415_100146
8	DR	120	dd	Roco	Ročno barvana, imporvizirana kupla	20230415_100233,20230415_100252
9	FS	835	it	Rivarossi		20230415_100654,20230415_100706
10	DB	1	de	Roco		20230415_122106,20230415_122118
11	FS	D445	it	Lima		20230415_122306,20230415_122317
12	SŽ	342	si	Lima,Ročno		20230415_122917,20230415_122929
13	DB	333	de	Roco		20230415_123342,20230415_123358
14	JŽ	35	yu	Roco,Ročno	AKA DB 57	20230415_124842,20230415_124856
15	SJ	1091	se	Fleischmann		20230415_130236,20230415_130247
16	ÖBB	X953	at	Liliput		20230415_130724,20230415_130738,20230415_130748
17	DB	52	de	Gutzold		20230415_133043,20230415_133057
18	DB	95	de	Piko		
19	JŽ	812	yu	Roco+Ročno	AKA DB 795/ÖBB 5081, poškodovana okna	20230415_134624,20230415_134638,20230415_134659
20	DB	189	de	Roco		20230415_141358,20230415_141409
21	ÖBB	3071	at	Kleinmodellbahn	Odlomljena stopnička	20230415_144004,20230415_144014
22	DR	89	dd	Piko		20230415_144413,20230415_144421
23	DB	261	de	Fleischmann		20230415_144723,20230415_144733
24	ÖBB	93	at	Kleinbahn	Gre slabo	20230415_144813,20230415_144818
25	DR	52	dd	Gutzold		20230415_150251,20230415_150309
26	ÖBB	44	at	Roco		20230415_152313,20230415_152332
27	SNCF	150	fr	Roco		20230415_152751,20230415_152800
28	ÖBB	1020	at	Roco		20230415_153231,20230415_153247
29	DB	216	de	Roco		20230415_153722,20230415_153731
30	FS	E424	it	Kleinbahn		20230415_153744,20230415_153753
31	SŽ	363	si	Lima,Ročno		20230423_085345,20230423_085356
32	JŽ	362	yu	Roco,Ročno	Gre slabo, poškodovane ograje	20230423_085545,20230423_085601
33	FS	E626	it	Roco		20230423_090147,20230423_090204
34	SŽ	642	si	Roco,Ročno		20230423_090312,20230423_090324
35	DB	103	de	Roco	Poškodovana okna	20230423_094612,20230423_094628
36	ÖBB	1110	at	Roco		20230423_094728,20230423_094738
37	ÖBB	2045	at	Roco		20230423_094905,20230423_094917
38	ÖBB	1042	at	Kleinbahn	Razbita	20230423_095044,20230423_095055,20230423_095106
39	DR	93	dd	?		20230423_103339,20230423_103352
40	ÖBB	2067	at	?		20230423_103858,20230423_103909
41	DB	236	de	Lima	AKA DR V36, WR 360	20230423_104014,20230423_104026,20230423_104105
42	ÖBB	5046	at	?		20230423_104251,20230423_104342
43	ÖBB	56	at	Kleinmodellbahn		20230423_112101,20230423_112115,
44	ÖBB	2062	at	Kleinbahn	Razpada	20230423_112258,20230423_112308
45	ÖBB	1245	at	Kleinbahn	Zelena	20230423_112412,20230423_112421
46	ÖBB	1245	at	Kleinbahn	Oranžna	20230423_112439,20230423_112450
47	DR	120	dd	?		20230502_095713,20230502_095726
48	kkStB	99	at	Kleinbahn	Gre slabo	20230502_095743,20230502_095752
49	FS	880	it	Roco		20230502_095817,20230502_095826
50	DB	64	de	Fleischmann		20230502_095841,20230502_095854
51	FS	835	it	?	Zelo hitra	20230502_095915,20230502_095925
52	DR	132	dd	Roco		20230502_104031,20230502_104045
53	SŽ	664	si	Lima,Ročno	Gre slabo	20230502_104231,20230502_104243,20230502_104316
54	DB	E32	de	Roco		20230502_104401,20230502_104412
55	DR	24	dd	?		20230502_104544,20230502_104607
56	ÖBB	1670	at	Roco		20230502_111611,20230502_111629
57	SŽ	644	si	Ročno		20230502_111728,20230502_111741
58	ÖBB	2043	at	Lima		20230502_111907,20230502_111920
59	MBTA	Boeing SLRV	us	Mehano	Boston tram	20230502_112003,20230502_112016
60	/	Düvag GT8N	de	Roco	Gotha tram, ne gre	20230502_112031,20230502_112047
61	DB	290	de	Roco		20230502_120409,20230502_120420
62	ÖBB	2084	at	Roco		20230502_120523,20230502_120533
63	ÖBB	4010	at	Lima		20230502_120606,20230502_120629
64	DR	93	dd	?		20230502_120717,20230502_120727
65	DR	86	dd	?		20230502_122656,20230502_122705
66	ÖBB	77	at	Kleinmodellbahn		20230502_122801,20230502_122812
67	ÖBB	92	at	Kleinbahn		20230502_122847,20230502_122858
68	FS	940	it	?		20230502_122921,20230502_122935
69	ÖBB	X534	at	Kleinbahn	Ne gre	20230502_125218,20230502_125231,20230502_125239
70	ÖBB	2060	at	Kleinbahn	Gre slabo	20230502_125334,20230502_125343
71	DB	E69	de	Lima		20230502_125423,20230502_125430
72	SNCB	202	be	Fleischmann		20230502_125524,20230502_125535
73	/	Ljubljana tram	yu	Ročno		20230502_131350,20230502_131404
74	/	Ljubljana tram	yu	Ročno		20230502_131630,20230502_131635
75	/	Zagreb tram	yu	Ročno		20230502_131732,20230502_131744
76	SNCF	67007	fr	Jouef		20230507_091139,20230507_091151
77	JŽ	661	yu	Mehano,Ročno		20230507_091313,20230507_091324
78	SNCF	539	fr	Mehano		20230507_091417,20230507_091426
79	SŽ	?	si	Mehano,Ročno		20230507_091528,20230507_091538
80	SPL	522	us	Mehano		20230507_101721,20230507_101736
81	SPL	2002K	us	Mehano		20230507_101759,20230507_101805
82	ÖBB	729	at	Kleinbahn		20230507_101815,20230507_101823
83	SŽ	661	si	Mehano,Ročno		20230507_101835,20230507_101844
84	JŽ	17	yu	Ročno		20230507_105345,20230507_105354,20230507_105403
85	JŽ	25	yu	Kleinbahn,Ročno		20230507_105431,20230507_105444
86	DB	80	de	Roco		20230507_105644,20230507_105655
87	DB	55	de	?		20230507_105802,20230507_105812
88	Santa Fe	F9	us	Mehano		20230507_110051,20230507_110243
89			us	Mehano		20230507_120115
90			us	Mehano		20230507_120115
91			us	Mehano		20230507_120115
92			us	Mehano		20230507_120115
93			us	Mehano		20230507_120115
94			us	Mehano		20230507_120115
95			us	Mehano		20230507_120115
96			us	Mehano		20230507_120115
97			us	Mehano		20230507_120115
98			us	Mehano		20230507_120115
99			us	Mehano		20230507_120115
100	ÖBB	156	at	Kleinbahn	Tender JŽ 25	20230507_120525,20230507_120536`;

const rows = data.split("\n");

const cells = rows.map((row) => row.split("\t"));

const compareStrings = (s1, s2) => (s1 < s2 ? -1 : s1 > s2 ? 1 : 0);
const compareLocomotives = (l1, l2) =>
  compareStrings(
    `${l1.country}-${l1.railroad}-${l1.class}-${l1.id}`,
    `${l2.country}-${l2.railroad}-${l2.class}-${l2.id}`
  );

const parsedData = cells
  .slice(1)
  .map((row) => ({
    id: row[0],
    railroad: row[1],
    class: row[2],
    country: row[3],
    modelBrand: row[4],
    details: row[5],
    images: row[6],
  }))
  .sort(compareLocomotives);

window.onload = function () {
  const parentElement = document.getElementById("locomotives");

  parsedData.forEach((locomotive) => {
    const locomotiveElement = document.createElement("lm-locomotive");
    setAttributes(locomotiveElement, {
      title: `${locomotive.railroad} ${locomotive.class}`,
      country: locomotive.country,
      images: locomotive.images,
      info: `Izdelava: ${locomotive.modelBrand}\n\n${locomotive.details}`,
    });
    parentElement.appendChild(locomotiveElement);
  });
};
