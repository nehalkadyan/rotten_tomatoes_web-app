import { createSlice } from "@reduxjs/toolkit";

// Define initial state with an array of article objects
const initialState = {
  slides: [
    {
      id: 1,
      image:
        "https://resizing.flixster.com/SJZT0Q75HvIzNEBkFGmVC0ElSCI=/550x310/v2/https://images.fandango.com/cms/assets/adea8a50-2779-11ef-ab6e-6bc4e16d49df--550bad-boys-ride-or-die-bo1.jpg",
      title: "BOX OFFIC : BAD BOYS RIDE TO $56.5 MILLION DEBUT",
      caption: "But Furiosa continues to drop",
      desc: "THE WILL SMITH AND MARTIN LAWRENCE ACTION-COMEDY PROVED THE BUDDY COP FRANCHISE STILL HAS SOME GAS LEFT IN THE TANK WITH AN IMPRESSIVE OPENING.",
      para: "The temptation to write that Will Smith saved the summer box office must be weighing on people this weekend. Sure it’s a snappy headline, but it hardly gets to the roots of the underlying issues, nor is it exactly a fair statement. His return to the big screen with Martin Lawrence after the slap heard round the world at the Oscars had the second-biggest opening of the summer and fifth of the year. But during a summer when the deck would normally be stacked in May, this would have been the fifth-best opener to this point in 2023 and third best in 2022. Very conservatively, the summer box office is headed somewhere north of just $2.4 billion, and even a better-than-estimated start like this does not move the needle too much. Oh, what the heck — in a strike-affected year when the top 10 at the box office has failed to reach $100 million for 10 straight weekends, everyone should take a victory where they can find it.",
    },
    {
      id: 2,
      image:
        "https://resizing.flixster.com/MzTbXW51be_CkpETYHDqAnJIrAE=/550x310/v2/https://images.fandango.com/cms/assets/792b0620-2385-11ef-ab6e-6bc4e16d49df--550june-2024-binge-guide.jpg",
      title: "6 TV AND STREAMING SHOWS YOU SHOULD BINGE-WATCH IN JUNE 2024",
      caption: "Return to Kingston, King's Landing and Carmy's kitchen.",
      desc: "WE RETURN TO KINGSTOWN, KING'S LANDING, AND CARMY'S KITCHEN, AS WELL AS THE VASTLY DIFFERENT SCI-FI/FANTASY WORLDS OF THE BOYS, ORPHAN BLACK, AND SWEET TOOTH.",
      para: "In June, we return to King’s Landing and Kingstown, plus the kitchen of The Bear and the post-apocalyptic world of Sweet Tooth. The superhero universe of The Boys and the clone club realm of Orphan Black are also back in a new season and a spinoff, respectively. These are the six streaming shows you should catch up on before they resume.",
    },
    {
      id: 3,
      image:
        "https://resizing.flixster.com/e68HP6eR6MtymuxZ6di9q5Oquv4=/550x310/v2/https://images.fandango.com/cms/assets/7bde0cf0-249d-11ef-8321-2b978811c524--550-1999-movies-showdown-rd4.jpg",
      title: "VOTE FOR THE BEST MOVIE OF 1999 - ROUND 4",
      caption: "We are down to elite eight",
      desc: "1999 WAS A BANNER YEAR FOR CULTURALLY SIGNIFICANT FILMS, AND WE'VE GATHERED 64 OF THEM TO FACE OFF IN THE ULTIMATE 25TH ANNIVERSARY SHOWDOWN.",
      para: "Of course, things only get more interesting from here. Cast your votes in Round 4 of the 1999 Movies Showdown before polls close on Tuesday, June 11 at 10pm PT, and then come back to see who made it into the Final Four!",
    },
    {
      id: 4,
      image:
        "https://resizing.flixster.com/BS5fIkS_Mz_Yya8f-LZf8ehicLI=/550x310/v2/https://images.fandango.com/cms/assets/aaef22b0-245a-11ef-ab6e-6bc4e16d49df--550hotd-reviews.jpg",
      title: "HOUSE OF THE DRAGON: SEASON 2 FIRST REVIEWS",
      caption: "Season 2 is expertly crafted with dragon fights",
      desc: "CRITICS SAY THE SECOND SEASON OF HBO'S GAME OF THRONES PREQUEL SERIES THOUGHTFULLY EXPLORES THE HORRORS OF WAR IN EQUALLY BLOODY AND INTIMATE DETAIL, WITH STANDOUT PERFORMANCES AND EXPLOSIVE ACTION.",
      para: "The Game of Thrones spinoff House of the Dragon returns with a second season on June 16, but the first reviews are already pouring in. The prequel show continues the story of House Targaryen in the lead-up to the civil war known as the “Dance of the Dragons.” Season 2 of House of the Dragon continues the positive reception of the franchise and the first season’s Certified Fresh rating with more character development, more action, and of course, more shocking deaths.",
    },
    {
      id: 5,
      image:
        "https://resizing.flixster.com/cbjJolEygwWyj2dmOxjvsh4n_nQ=/540x610/v2/https://images.fandango.com/cms/assets/800cb220-2774-11ef-8321-2b978811c524--240-speed.jpg",
      title: "KEANU REAVES MOVIES RANKED",
      caption: "Speed released in theatres 30 years ago",
      para: "He’s traveled through time in search of knowledge, saved Sandra Bullock from getting blown up on a bus, freed humanity from being enslaved by computer overlords, and delivered some of the most righteous vengeance ever exacted on behalf of a murdered puppy — and all that really only scratches the surface of all the stuff Keanu Reeves has been up to on the big screen. Since making his mark as a quirky young lead in the ’80s, Reeves has followed his cinematic muse all over the genre map, from hit comedies like Bill and Ted’s Excellent Adventure to blockbuster action thrillers like Speed, John Wick, and Point Break, as well as dramatic showcases like Dangerous Liaisons and My Own Private Idaho. Also, he knows kung fu. Whoa.",
    },
    {
      id: 6,
      image:
        "https://resizing.flixster.com/hjX9BDEvoUQFHzzwpvDUCosTmC0=/540x610/v2/https://images.fandango.com/cms/assets/10d18b70-2534-11ef-a07e-5b03d6159fe4--palmroyale.jpg",
      title: "RENEWED & CANCELLED",
      caption: "Apple TV+ comedy Palm Royale is renewed",
      para: "FIND OUT WHICH SHOWS ARE RETURNING AND WHICH ARE ENDING IN THIS LIST OF 2024'S RENEWED AND CANCELLED TV SHOWS.",
    },
  ],
};

// Create a Redux slice named 'article' using createSlice from Redux Toolkit
const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
});

// Export the reducer generated by createSlice
export default articleSlice.reducer;
