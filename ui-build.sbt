import scala.sys.process.Process

val Success = 0
val Error = 1

PlayKeys.playRunHooks += baseDirectory.map(FrontendRunHook.apply).value

def runOnCommandline(script: String)(implicit dir: File): Int = {
  Process("env CI=true " + script, dir)
} !

def isNodeModulesInstalled(implicit dir: File): Boolean = (dir / "node_modules").exists()

def runNpmInstall(implicit dir: File): Int = if (isNodeModulesInstalled) Success else runOnCommandline(FrontendCommands.dependencyInstall)

def ifNodeModulesInstalled(task: => Int)(implicit dir: File): Int =
  if (runNpmInstall == Success) task
  else Error

def executeUiTests(implicit dir: File): Int = ifNodeModulesInstalled(runOnCommandline(FrontendCommands.test))

def executeProdBuild(implicit dir: File): Int = ifNodeModulesInstalled(runOnCommandline(FrontendCommands.build))

lazy val uiTest = taskKey[Unit]("Run UI tests when testing application.")

uiTest := {
  implicit val userInterfaceRoot: File = baseDirectory.value / "ui"
  if (executeUiTests != Success) throw new Exception("UI tests failed!")
}

lazy val uiProdBuild = taskKey[Unit]("Run UI build when packaging the application.")

uiProdBuild := {
  implicit val userInterfaceRoot: File = baseDirectory.value / "ui"
  if (executeProdBuild != Success) throw new Exception("Oops! UI Build crashed.")
}

dist := (dist dependsOn uiProdBuild).value
stage := (stage dependsOn uiProdBuild).value
test := ((test in Test) dependsOn uiTest).value