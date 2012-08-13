function runTest()
{
    FBTest.sysout("$x.START");

    FBTest.openNewTab(basePath + "commandLine/api/$x.html", function(win)
    {
        FBTest.openFirebug();

        FBTest.enableConsolePanel(function(win)
        {
            var taskList = new FBTest.TaskList();

            taskList.push(FBTest.executeCommandAndVerify, "$x(\"//button\")",
                "[button#btn1, button#btn2, button#btn3, button#btn4, button#btn5]",
                "pre", "objectBox objectBox-array");
            taskList.push(FBTest.executeCommandAndVerify, "$x(\"count(//button)\")", "5", "pre",
                "objectBox objectBox-number");
            taskList.push(FBTest.executeCommandAndVerify, "$x(\"string(//button/text())\")",
                "\"Button 1\"", "pre", "objectBox objectBox-string");
            taskList.push(FBTest.executeCommandAndVerify, "$x(\"count(//button)>2\")", "true",
                "pre", "objectBox objectBox-number");
            taskList.push(FBTest.executeCommandAndVerify,
                "$x(\".//button\", document.getElementById(\"buttonGroup2\"))",
                "[button#btn4, button#btn5]", "pre", "objectBox objectBox-array");
            taskList.push(FBTest.executeCommandAndVerify, "$x(\"//button\", document, \"node\")",
                /<button\sid="btn1">/, "a", "objectLink objectLink-element");
            taskList.push(FBTest.executeCommandAndVerify,
                "$x(\"count(//button)>2\", document, \"number\")", "1", "pre",
                "objectBox objectBox-number");
            taskList.push(FBTest.executeCommandAndVerify,
                "$x(\"count(//button)>2\", document, \"string\")", "\"true\"", "pre",
                "objectBox objectBox-string");
            taskList.push(FBTest.executeCommandAndVerify,
                "$x(\"//button\", document, \"bool\")", "true", "pre",
                "objectBox objectBox-number");

            taskList.run(function() {
                FBTest.testDone("$x.DONE");
            });
        });
    });
}
