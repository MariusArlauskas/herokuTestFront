import Vue from "vue";
import VueRouter from "vue-router";
import Homepage from "../components/HomePage/HomePage";

import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";


import Profile from "../components/ProfilePage/ProfileMain";
import ProfileMainWall from "../components/ProfilePage/MoviesWall/MainWall";
import ProfileMoviesList from "../components/ProfilePage/MoviesList/MoviesList";
import ProfileForum from "../components/ProfilePage/ProfileForum/ProfileForum";
import FollowsList from "../components/ProfilePage/Follows/Follows";
import FollowersList from "../components/ProfilePage/Followers/Followers";
import ProfileEdit from "../components/UserSettings/ProfileEdit";
import ProfileEditProfile from "../components/UserSettings/ProfileEditProfile";

import AdminMenu from "../components/AdminSettings/AdminMenu";
import AdminUsers from "../components/AdminSettings/AdminUsers/AdminUsers";

import Movies from "../components/MoviesPage/MoviesMain";
import MoviePage from "../components/MoviesPage/MoviePage/MoviePage";
import MovieMainWall from "../components/MoviesPage/MoviePage/MainWall/MainWall";
import MovieCrew from "../components/MoviesPage/MoviePage/MovieCrew/MovieCrew";

import PersonPage from "../components/PersonPage/PersonPage";
import PersonMovies from "../components/PersonPage/PersonMovies/PersonMovies";

import ForumPage from "../components/ForumPage/ForumMain";
import ForumThread from "../components/ForumPage/ForumThread/ForumThread";

import AboutPage from "../components/AboutPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Homepage
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies
  },
  {
    path: "/forum",
    name: "Forum",
    component: ForumPage,
    children: [
    ]
  },
  {
    path: "/forum/:id",
    name: "ForumThread",
    component: ForumThread
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    children: [
      {
        path: "main",
        name: "ProfileMainWall",
        component: ProfileMainWall
      },
      {
        path: "movies",
        name: "ProfileMoviesList",
        component: ProfileMoviesList
      },
      {
        path: "forum",
        name: "ProfileForum",
        component: ProfileForum
      },
      {
        path: "follows",
        name: "FollowsList",
        component: FollowsList
      },
      {
        path: "followers",
        name: "FollowersList",
        component: FollowersList
      },
    ]
  },
  {
    path: "/profile/:id/edit",
    name: "ProfileEdit",
    component: ProfileEdit,
    children: [
      {
        path: "profile",
        name: "ProfileEditProfile",
        component: ProfileEditProfile
      },
    ]
  },
  {
    path: "/adminMenu",
    name: "AdminMenu",
    component: AdminMenu,
    children: [
      {
        path: "users",
        name: "AdminUsers",
        component: AdminUsers
      },
    ]
  },
  {
    path: "/movie/:id",
    name: "MoviePage",
    component: MoviePage,
    children: [
      {
        path: "main",
        name: "MovieMainWall",
        component: MovieMainWall
      },
      {
        path: "crew",
        name: "MovieCrew",
        component: MovieCrew
      }
    ]
  },
  {
    path: "/person/:id",
    name: "PersonPage",
    component: PersonPage,
    children: [
      {
        path: "movies",
        name: "PersonMovies",
        component: PersonMovies
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: SignUp
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: "/"
});

export default router;
