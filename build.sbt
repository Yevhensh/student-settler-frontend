import sbt.Keys.libraryDependencies

name := "student-settler-frontend"

version := "1.0"

lazy val `money_opt_frontend` = (project in file(".")).enablePlugins(PlayScala)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"

scalaVersion := "2.12.10"

sources in (Compile, doc) := Seq.empty
publishArtifact in (Compile, packageDoc) := false

libraryDependencies ++= Seq(
  guice,
  "org.scalatestplus.play" %% "scalatestplus-play" % "4.0.2" % Test
)