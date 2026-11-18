/**
 * Localities served — Mumbai Western Suburbs.
 *
 * Content is general orientation only (well-known roads, transit and
 * neighbourhoods). It deliberately contains NO prices, yields or market
 * statistics. Review and refine with local knowledge before launch.
 */

export interface Locality {
  slug: string;
  name: string;
  /** Short line for cards */
  tagline: string;
  /** Opening paragraph — unique per locality */
  overview: string;
  /** What living / working here is like */
  character: string;
  /** Typical property formats Kiran can help explore here */
  propertyLandscape: { residential: string; commercial: string };
  connectivity: string[];
  neighbourhoods: string[];
  /** Who typically considers this area */
  suitedTo: string[];
  /** Slugs of nearby localities for internal linking */
  nearby: string[];
  /** Short note specific to how Kiran's consultancy supports this area */
  consultingNote: string;
}

export const localities: Locality[] = [
  {
    slug: "kandivali-east",
    name: "Kandivali East",
    tagline: "Our home ground — townships, greenery and the Western Express Highway.",
    overview:
      "Kandivali East is where Kiran Nikam Consulting is based, with our office in Thakur Complex on 90 Feet Road. The area is known for large planned residential layouts such as Thakur Village, Thakur Complex and Lokhandwala Township, set against the green edge of Sanjay Gandhi National Park.",
    character:
      "Daily life here revolves around self-contained gated complexes with schools, shops and clinics close at hand. The Western Express Highway runs along the western edge of the area, giving road access north towards Borivali and Dahisar and south towards Goregaon, Andheri and the airport.",
    propertyLandscape: {
      residential:
        "High-rise towers and housing society buildings in planned townships, with a wide range of 1, 2 and 3 BHK configurations.",
      commercial:
        "Ground-floor shops and retail units within complexes, high-street frontage along main roads, and smaller office premises.",
    },
    connectivity: [
      "Western Express Highway",
      "Mumbai Metro Line 7 (Dahisar East – Andheri East) along the highway",
      "Kandivali railway station on the Western Line (via Akurli Road / Thakur Complex roads)",
    ],
    neighbourhoods: ["Thakur Village", "Thakur Complex", "Lokhandwala Township", "Samta Nagar", "Ashok Nagar", "Akurli Road"],
    suitedTo: ["Families looking for gated complexes", "Working professionals using the Western Express Highway", "Retail entrepreneurs seeking community-facing shops"],
    nearby: ["kandivali-west", "borivali-east", "malad-east"],
    consultingNote:
      "Because our office is in Thakur Complex, Kandivali East is the area where you can most easily meet Kiran in person and arrange site visits at short notice.",
  },
  {
    slug: "kandivali-west",
    name: "Kandivali West",
    tagline: "Established neighbourhoods between the railway line and Link Road.",
    overview:
      "Kandivali West stretches from the Western Railway line towards the creeks and Link Road, combining long-established neighbourhoods like Mahavir Nagar and Dahanukarwadi with the planned layouts of Charkop.",
    character:
      "The area has a lived-in, community feel with markets, places of worship and schools woven through residential streets. S.V. Road and New Link Road carry north–south traffic, while the railway station keeps the city centre within reach by local train.",
    propertyLandscape: {
      residential:
        "A mix of older housing societies, redevelopment projects and newer towers, offering everything from compact 1 BHKs to larger family homes.",
      commercial:
        "Shops and showrooms on S.V. Road and Link Road, and neighbourhood retail within residential pockets.",
    },
    connectivity: [
      "Kandivali railway station (Western Line)",
      "New Link Road and S.V. Road",
      "Mumbai Metro Line 2A (Dahisar – D.N. Nagar) along Link Road",
    ],
    neighbourhoods: ["Mahavir Nagar", "Charkop", "Dahanukarwadi", "Irani Wadi", "Shankar Lane"],
    suitedTo: ["Families who value established neighbourhoods", "Buyers interested in redevelopment projects", "Business owners seeking high-street visibility"],
    nearby: ["kandivali-east", "borivali-west", "malad-west"],
    consultingNote:
      "Redevelopment is common in parts of Kandivali West, so we help you look closely at project status, approvals and timelines before you commit.",
  },
  {
    slug: "borivali-east",
    name: "Borivali East",
    tagline: "Living at the doorstep of Sanjay Gandhi National Park.",
    overview:
      "Borivali East sits right beside the main entrance of Sanjay Gandhi National Park, giving it some of the greenest surroundings in suburban Mumbai. Neighbourhoods such as Devipada, Magathane and Dattapada line the Western Express Highway.",
    character:
      "The pace here is calmer, with residential towers looking out over forest and hills. The highway and Metro Line 7 make it practical for those commuting to Andheri, Goregaon or further south.",
    propertyLandscape: {
      residential:
        "Mid- and high-rise residential towers, many with views of the National Park, plus established housing societies.",
      commercial:
        "Highway-facing commercial premises and neighbourhood shops serving residential clusters.",
    },
    connectivity: [
      "Western Express Highway",
      "Mumbai Metro Line 7 stations along the highway",
      "Borivali railway station (Western Line) on the western side",
    ],
    neighbourhoods: ["Devipada", "Magathane", "Dattapada", "Kajupada", "Rajendra Nagar", "Ashokvan"],
    suitedTo: ["Nature lovers", "Families seeking quieter surroundings", "Highway commuters"],
    nearby: ["borivali-west", "kandivali-east"],
    consultingNote:
      "Views, building orientation and access to the highway vary a lot street to street here — we help you compare options side by side.",
  },
  {
    slug: "borivali-west",
    name: "Borivali West",
    tagline: "A busy, self-sufficient suburb with strong rail connections.",
    overview:
      "Borivali West is one of the most established and self-sufficient suburbs in the north-west of Mumbai. Areas such as Shimpoli, I.C. Colony, Eksar and Gorai offer a wide variety of homes, while S.V. Road and L.T. Road form busy shopping corridors.",
    character:
      "With markets, schools, hospitals and recreation all close by, residents rarely need to travel far for everyday needs. Borivali station is a major hub on the Western Line, and Link Road provides a fast north–south route.",
    propertyLandscape: {
      residential:
        "Older housing societies, redevelopment towers and premium high-rises across I.C. Colony, Gorai and Link Road.",
      commercial:
        "Retail and showroom space on S.V. Road and L.T. Road, office premises near the station, and shops in residential areas.",
    },
    connectivity: [
      "Borivali railway station (Western Line)",
      "Link Road and S.V. Road",
      "Mumbai Metro Line 2A along Link Road",
    ],
    neighbourhoods: ["Shimpoli", "I.C. Colony", "Eksar", "Gorai", "Chikuwadi", "Vazira Naka"],
    suitedTo: ["Families wanting everything nearby", "Rail commuters", "Retailers looking for high footfall"],
    nearby: ["borivali-east", "kandivali-west"],
    consultingNote:
      "Borivali West has a deep resale and rental market; we help you shortlist efficiently so you see the most relevant options first.",
  },
  {
    slug: "malad-east",
    name: "Malad East",
    tagline: "Where established homes meet growing business districts.",
    overview:
      "Malad East combines residential neighbourhoods like Pushpa Park, Kurar Village and Dindoshi with a growing set of office and IT parks along the Western Express Highway and Film City Road.",
    character:
      "The area appeals to professionals who want to live close to work, with offices, malls and residential towers within short distances of each other. Film City Road links towards Goregaon East and Aarey.",
    propertyLandscape: {
      residential:
        "Residential towers and gated complexes near the highway, alongside older housing societies inland.",
      commercial:
        "Office space in IT and business parks, commercial units along the highway, and neighbourhood retail.",
    },
    connectivity: [
      "Western Express Highway",
      "Mumbai Metro Line 7 along the highway",
      "Malad railway station (Western Line)",
    ],
    neighbourhoods: ["Pushpa Park", "Kurar Village", "Dindoshi", "Rani Sati Marg", "Pathanwadi"],
    suitedTo: ["Working professionals", "Businesses needing office premises", "Investors exploring rental demand"],
    nearby: ["malad-west", "kandivali-east", "goregaon-east"],
    consultingNote:
      "For office seekers, we help you compare building specifications, workstations and lease terms across nearby business parks.",
  },
  {
    slug: "malad-west",
    name: "Malad West",
    tagline: "Malls, Mindspace and the coast at Marve and Madh.",
    overview:
      "Malad West runs from the railway station across Link Road towards the coastline at Marve and Madh. It is home to large malls, the Mindspace business district and popular residential pockets such as Orlem, Evershine Nagar and Malvani.",
    character:
      "Link Road is the area’s commercial spine, lined with retail, offices and residential towers. Further west the pace changes, with the coastal stretches around Marve and Madh Island offering a quieter setting.",
    propertyLandscape: {
      residential:
        "Contemporary towers along Link Road, established societies near the station and Orlem, and larger homes towards the coast.",
      commercial:
        "Office space in business districts such as Mindspace, retail on Link Road and S.V. Road, and showroom space.",
    },
    connectivity: [
      "Malad railway station (Western Line)",
      "New Link Road and S.V. Road",
      "Mumbai Metro Line 2A along Link Road",
    ],
    neighbourhoods: ["Orlem", "Evershine Nagar", "Mindspace", "Chincholi Bunder", "Marve", "Malvani"],
    suitedTo: ["Professionals working in Malad business districts", "Families seeking modern towers", "Retail and showroom businesses"],
    nearby: ["malad-east", "kandivali-west", "goregaon-west"],
    consultingNote:
      "Malad West offers both commercial and residential opportunities close together — ideal if you want to live near your business.",
  },
  {
    slug: "goregaon-east",
    name: "Goregaon East",
    tagline: "Business parks, exhibition centres and the green expanse of Aarey.",
    overview:
      "Goregaon East has grown into a significant business destination, with corporate offices and the NESCO exhibition grounds along the Western Express Highway, while Aarey Colony and Film City bring a large green belt to its eastern side.",
    character:
      "The area offers a balance of work and greenery. Residential complexes sit close to office parks and malls, and the Western Express Highway and Metro Line 7 provide fast north–south travel.",
    propertyLandscape: {
      residential:
        "Large gated complexes and premium towers, many close to the highway and office districts.",
      commercial:
        "Corporate office space, business parks and commercial units on and around the Western Express Highway.",
    },
    connectivity: [
      "Western Express Highway",
      "Mumbai Metro Line 7 along the highway",
      "Goregaon railway station (Western Line)",
    ],
    neighbourhoods: ["NESCO", "Aarey Colony", "Film City Road", "Gokuldham", "Dindoshi", "Jay Prakash Nagar"],
    suitedTo: ["Corporate professionals", "Companies seeking office premises", "Families wanting gated complexes"],
    nearby: ["goregaon-west", "malad-east", "jogeshwari"],
    consultingNote:
      "Goregaon East is a strong option for office leasing — we help businesses evaluate premises, fit-out condition and lease terms.",
  },
  {
    slug: "goregaon-west",
    name: "Goregaon West",
    tagline: "Neighbourly streets between S.V. Road and Link Road.",
    overview:
      "Goregaon West is a well-connected residential suburb whose neighbourhoods — Bangur Nagar, Motilal Nagar, Jawahar Nagar and Siddharth Nagar — sit between S.V. Road, the railway line and Link Road.",
    character:
      "It is valued for its established communities, local markets and access to both the railway station and Link Road. Redevelopment of older layouts continues to add newer buildings to the area.",
    propertyLandscape: {
      residential:
        "Established housing societies, redevelopment projects and newer towers close to Link Road.",
      commercial:
        "Street-level shops on S.V. Road and Link Road, and smaller office premises.",
    },
    connectivity: [
      "Goregaon railway station (Western Line)",
      "S.V. Road and New Link Road",
      "Mumbai Metro Line 2A along Link Road",
    ],
    neighbourhoods: ["Bangur Nagar", "Motilal Nagar", "Jawahar Nagar", "Siddharth Nagar", "Unnat Nagar"],
    suitedTo: ["Families seeking community-oriented neighbourhoods", "Buyers interested in redevelopment", "Rail commuters"],
    nearby: ["goregaon-east", "malad-west", "jogeshwari"],
    consultingNote:
      "With redevelopment active across Goregaon West, we help you understand the status of each building before you buy or rent.",
  },
  {
    slug: "andheri-east",
    name: "Andheri East",
    tagline: "Mumbai’s airport district and one of its largest business hubs.",
    overview:
      "Andheri East is home to Chhatrapati Shivaji Maharaj International Airport and to major business districts in MIDC, SEEPZ, Marol, Chakala and Saki Naka, making it one of the most important commercial areas in the western suburbs.",
    character:
      "It is a busy, work-centred part of the city. Metro Line 1 connects it east–west to Versova and Ghatkopar, while the Western Express Highway and Metro Line 7 run north–south.",
    propertyLandscape: {
      residential:
        "Apartment towers and housing societies close to offices and the airport, popular for those who want a short commute.",
      commercial:
        "A deep market of office space, commercial units and business premises across MIDC, Marol, Chakala and the highway corridor.",
    },
    connectivity: [
      "Chhatrapati Shivaji Maharaj International Airport",
      "Mumbai Metro Line 1 (Versova – Andheri – Ghatkopar)",
      "Western Express Highway and Metro Line 7",
      "Andheri railway station (Western Line)",
    ],
    neighbourhoods: ["MIDC", "SEEPZ", "Marol", "Chakala", "J.B. Nagar", "Saki Naka"],
    suitedTo: ["Businesses seeking office space", "Frequent flyers", "Professionals working in MIDC and SEEPZ"],
    nearby: ["andheri-west", "jogeshwari", "vile-parle"],
    consultingNote:
      "For commercial clients, Andheri East offers a wide choice of office formats — we help you compare options against your team size and budget.",
  },
  {
    slug: "andheri-west",
    name: "Andheri West",
    tagline: "Lively neighbourhoods from Lokhandwala to Versova.",
    overview:
      "Andheri West is one of the most vibrant suburbs of Mumbai, taking in Lokhandwala Complex, Oshiwara, Four Bungalows, D.N. Nagar and the seaside neighbourhood of Versova.",
    character:
      "Known for restaurants, cafés, studios and a strong creative community, Andheri West is popular with young professionals and families alike. Metro Lines 1 and 2A give it excellent public transport access.",
    propertyLandscape: {
      residential:
        "Apartments in Lokhandwala and Oshiwara, established societies in Four Bungalows and Versova, and newer premium towers.",
      commercial:
        "Retail and restaurant premises, studio and office space, and high-street shops along Link Road and main roads.",
    },
    connectivity: [
      "Andheri railway station (Western Line)",
      "Mumbai Metro Line 1 and Metro Line 2A",
      "New Link Road and S.V. Road",
    ],
    neighbourhoods: ["Lokhandwala Complex", "Oshiwara", "Versova", "Four Bungalows", "D.N. Nagar", "Seven Bungalows"],
    suitedTo: ["Young professionals", "Creative and media businesses", "Retail and F&B entrepreneurs"],
    nearby: ["andheri-east", "jogeshwari", "juhu"],
    consultingNote:
      "Rental demand in Andheri West moves quickly — we help tenants and landlords prepare in advance so good opportunities are not missed.",
  },
  {
    slug: "jogeshwari",
    name: "Jogeshwari",
    tagline: "A central link between the western and eastern suburbs.",
    overview:
      "Jogeshwari sits between Goregaon and Andheri and is defined by the Jogeshwari–Vikhroli Link Road (JVLR), which connects the western suburbs to the eastern suburbs. Its western side borders Oshiwara, while the historic Jogeshwari Caves lie on the eastern side.",
    character:
      "The area offers central access in every direction — north, south and across the city — with the Western Express Highway, JVLR and the railway station all close by.",
    propertyLandscape: {
      residential:
        "A mix of newer residential towers near JVLR and the highway, and established neighbourhoods closer to the station.",
      commercial:
        "Commercial premises near JVLR and the highway, and neighbourhood retail.",
    },
    connectivity: [
      "Jogeshwari–Vikhroli Link Road (JVLR)",
      "Western Express Highway",
      "Jogeshwari railway station (Western Line)",
    ],
    neighbourhoods: ["Jogeshwari East", "Jogeshwari West", "Oshiwara (border)", "Majaswadi", "Pratap Nagar"],
    suitedTo: ["Professionals commuting to the eastern suburbs", "Buyers looking for central access", "Businesses needing cross-city reach"],
    nearby: ["andheri-east", "andheri-west", "goregaon-east"],
    consultingNote:
      "If you travel regularly to both sides of the city, Jogeshwari’s location deserves a close look — we can help you compare it with neighbouring areas.",
  },
  {
    slug: "juhu",
    name: "Juhu",
    tagline: "Seafront living along one of Mumbai’s best-known beaches.",
    overview:
      "Juhu is synonymous with Juhu Beach and is one of the most sought-after residential addresses in the western suburbs, with tree-lined streets in the JVPD Scheme and along Juhu Tara Road.",
    character:
      "The area combines a relaxed seaside atmosphere with proximity to the airport, Vile Parle, Santacruz and Andheri. It is known for independent bungalows, low-rise buildings and premium apartments.",
    propertyLandscape: {
      residential:
        "Premium apartments, sea-facing residences and select independent homes, with limited inventory in the most popular pockets.",
      commercial:
        "Boutique retail, restaurant and hospitality-adjacent premises, and select office spaces.",
    },
    connectivity: [
      "Juhu Tara Road and Juhu Church Road",
      "Close to the domestic and international airport terminals",
      "Vile Parle and Santacruz railway stations (Western Line)",
    ],
    neighbourhoods: ["JVPD Scheme", "Juhu Tara Road", "Gulmohar Road", "Juhu Koliwada", "Ruia Park"],
    suitedTo: ["Buyers seeking premium seaside homes", "Families wanting a quieter upscale setting", "Boutique hospitality and retail businesses"],
    nearby: ["vile-parle", "santacruz", "andheri-west"],
    consultingNote:
      "Premium homes in Juhu are often marketed discreetly — speak with Kiran about your requirement so it can be matched carefully.",
  },
  {
    slug: "vile-parle",
    name: "Vile Parle",
    tagline: "A cultured, education-focused suburb next to the airport.",
    overview:
      "Vile Parle is known for its educational institutions, cultural life and close-knit residential neighbourhoods. Vile Parle East sits beside the domestic airport terminal, while Vile Parle West runs towards Juhu.",
    character:
      "It is a suburb with a strong sense of community, well-kept residential lanes and a long-standing Marathi and Gujarati cultural presence. The railway station and Western Express Highway make commuting straightforward.",
    propertyLandscape: {
      residential:
        "Established housing societies, redevelopment projects and select premium buildings, especially in Vile Parle West.",
      commercial:
        "Neighbourhood retail, small office premises and shops near the station and main roads.",
    },
    connectivity: [
      "Vile Parle railway station (Western Line)",
      "Western Express Highway",
      "Domestic airport terminal in Vile Parle East",
    ],
    neighbourhoods: ["Vile Parle East", "Vile Parle West", "Navpada", "Irla", "JVPD (border)"],
    suitedTo: ["Families prioritising education", "Frequent flyers", "Buyers seeking established communities"],
    nearby: ["juhu", "santacruz", "andheri-east"],
    consultingNote:
      "Much of the housing stock in Vile Parle is in established or redeveloping societies — we help you review society and building details with care.",
  },
  {
    slug: "santacruz",
    name: "Santacruz",
    tagline: "Central western suburb close to BKC and the airport.",
    overview:
      "Santacruz sits between Bandra and Vile Parle. Santacruz East includes Kalina and the University of Mumbai’s Kalina campus and is close to Bandra Kurla Complex, while Santacruz West offers leafy residential lanes near Juhu and Khar.",
    character:
      "Its central location makes it practical for professionals working in BKC, Bandra or the airport area, while the western side has a quieter residential character.",
    propertyLandscape: {
      residential:
        "Established apartments and redevelopment towers in Santacruz West, and a mix of residential buildings in Santacruz East and Kalina.",
      commercial:
        "Retail and office premises near the station and S.V. Road, and commercial space with access to BKC.",
    },
    connectivity: [
      "Santacruz railway station (Western Line)",
      "Western Express Highway and Santacruz–Chembur Link Road",
      "Close to Bandra Kurla Complex and the airport",
    ],
    neighbourhoods: ["Santacruz West", "Santacruz East", "Kalina", "Vakola", "Prabhat Colony"],
    suitedTo: ["Professionals working in BKC", "Families seeking a central location", "Businesses needing city-centre access"],
    nearby: ["bandra", "vile-parle", "juhu"],
    consultingNote:
      "Santacruz rewards careful comparison between the East and West sides — we help you weigh commute, lifestyle and budget.",
  },
  {
    slug: "bandra",
    name: "Bandra",
    tagline: "The gateway to the western suburbs, from Bandstand to BKC.",
    overview:
      "Bandra is often called the queen of the suburbs. Bandra West is known for Bandstand, Carter Road, Pali Hill, Hill Road and Linking Road, while Bandra East includes Bandra Kurla Complex (BKC), one of Mumbai’s leading business districts.",
    character:
      "The area blends heritage lanes and seafront promenades with premium residences and a lively dining and retail scene. The Bandra–Worli Sea Link connects it quickly to South Mumbai.",
    propertyLandscape: {
      residential:
        "Premium apartments, sea-facing residences and heritage-area homes in Bandra West; residential buildings in Bandra East.",
      commercial:
        "Grade-A office space in BKC, flagship retail on Linking Road and Hill Road, and boutique commercial premises.",
    },
    connectivity: [
      "Bandra railway station (Western and Harbour Lines)",
      "Bandra–Worli Sea Link",
      "Western Express Highway",
      "Bandra Kurla Complex business district",
    ],
    neighbourhoods: ["Bandstand", "Carter Road", "Pali Hill", "Hill Road", "Linking Road", "Bandra Kurla Complex"],
    suitedTo: ["Buyers seeking premium residences", "Corporates looking at BKC", "Flagship retail and F&B brands"],
    nearby: ["santacruz", "juhu"],
    consultingNote:
      "Bandra’s premium and commercial segments call for detailed due diligence — we help you prepare the right questions before each viewing.",
  },
];

export function getLocality(slug: string): Locality | undefined {
  return localities.find((l) => l.slug === slug);
}

export function getLocalityName(slug: string): string {
  return getLocality(slug)?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
