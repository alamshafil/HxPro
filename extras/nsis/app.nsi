!include "System.nsh"

RequestExecutionLevel admin

Name "haxpro_app"
OutFile "haxpro_app.exe"

AutoCloseWindow true

Function .onGUIInit
    ; move window off screen
    System::Call "User32::SetWindowPos(i, i, i, i, i, i, i) b ($HWNDPARENT, 0, -10000, -10000, 0, 0, ${SWP_NOOWNERZORDER}|${SWP_NOSIZE})"
FunctionEnd

Section -main
    HideWindow
    SetOverwrite on
    SetOutPath "$TEMP\haxpro_app\app_data\"
    File /nonfatal /a /r "temp\*" 
    Exec "$TEMP\haxpro_app\app_data\haxpro_runtime.exe"
SectionEnd