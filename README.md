# Minecraft_Skript-API
Check this out for API usage and examples.

# Image Printer API
	+---------------------------------------------[USAGE]---------------------------------------------+

	(Intended to be used for servers without JSON parsing Skript addons)

	Source: https://github.com/fireclaws9/Minecraft_Skript-API/blob/master/StringDatasAPI
	
	[Paste Image] imagePrinter_pasteImageByUrl( IMAGE_URL , COLOR_SAMPLES , PASTE_LOCATION , RESIZE_WIDTH [@NULLABLE], RESIZE_HEIGHT [@NULLABLE])
	
	+-------------------------------------------------------------------------------------------------+


	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Pasting Executor's Face At Their Current Location
	
	command /printMyFace:
		trigger:
			
			set {_playerUuid} to (executor's uuid)
			replace all "-" with "" in {_playerUuid}
			# As the avator api requires simplified uuid, removing "-" from player's uuid
			
			set {_response} to imagePrinter_pasteImageByUrl("https://cravatar.eu/helmavatar/%{_playerUuid}%/8.png", 64, (executor's location), 8, 8)
			# Pasting the image from api with 64 color samples, resizing to 8x8 pixels at command executor's location
			# (As the avator api is already returning 8x8 pixels image, the resize parameters at the end could be removed, in this case it's just for showcase)
			
			send "%{_response}%" to executor
			# Send feedback to command executor for example errors

	+-------------------------------------------------------------------------------------------------+
# String Datas API
	+---------------------------------------------[USAGE]---------------------------------------------+

	(Intended to be used for servers without JSON parsing Skript addons)

	Source: https://github.com/fireclaws9/Minecraft_Skript-API/blob/master/StringDatasAPI
	
	[New/Overwrite Data] stringDatasAPI_setData( DATA_NAME , DATA_VALUE , OLD_DATA [@NULLABLE] )
	[Remove Data] stringDatasAPI_removeData( OLD_DATA , DATA_NAME )
	[Get/Read Data] stringDatasAPI_getData( OLD_DATA , DATA_NAME )
	[Get Data Names] stringDatasAPI_getDataNames( OLD_DATA )
	[Check Data is Set] stringDatasAPI_isSet( OLD_DATA , DATA_NAME )
	
	+-------------------------------------------------------------------------------------------------+
	
	
	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Example For Storing Player's Balance
	
	command /addOneToBalance:
		trigger:
			set {_oldBalance} to stringDatasAPI_getData({playerData::%UUID of executor%}, "BALANCE")
			# Read the balance of executor in text

			set {_oldBalance} to ({_oldBalance} parsed as number)
			# Parse the data from text to number

			set {_newBalance} to ({_oldBalance} + 1)
			# Get the new balance

			set {playerData::%UUID of player%} to stringDatasAPI_setData("BALANCE", "%{_newBalance}%")
			# Set the balance of executor

			set {_checkNewBalance} to stringDatasAPI_getData({playerData::%UUID of executor%}, "BALANCE")
			# Get the balance of executor again

			send "Your new balance: %{_checkNewBalance}%" to executor

	+-------------------------------------------------------------------------------------------------+


	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Example For Storing Multiple Datas Together
	
	command /iWantSomeDatas:
		trigger:
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("BALANCE", "0")
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("HEALTH", "20", {playerData::%UUID of executor%})
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("HUNGER", "20", {playerData::%UUID of executor%})
			set {playerData::%UUID of executor%} to stringDatasAPI_setData("IQ", "180", {playerData::%UUID of executor%})
			# Set data named BALANCE, HEALTH, HUNGER, and IQ for executor

	+-------------------------------------------------------------------------------------------------+
# Unix API
	+---------------------------------------------[USAGE]---------------------------------------------+

	(Intended to be used for servers running outdated Skript which does not support UNIX)

	[Date To Unix] unixAPI_dateToUnix( DATE )
	[Unix To Date] unixAPI_unixToDate( UNIX )
	
	+-------------------------------------------------------------------------------------------------+
