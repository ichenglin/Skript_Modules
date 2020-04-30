# Minecraft_Skript-API
Check this out for API usage and examples.

# String Datas API
	+---------------------------------------------[USAGE]---------------------------------------------+

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
# CubedAPI
	+---------------------------------------------[USAGE]---------------------------------------------+

	[Get Boosters List] cubedAPI_getBoosters( API_KEY , RETURN_UNIX_TIME_STAMP [@NULLABLE] )
	[Get Votes] cubedAPI_getVoters( API_KEY )
	
	+-------------------------------------------------------------------------------------------------+
	
	
	+--------------------------------------------[EXAMPLE]--------------------------------------------+
	# Example For Getting Boosters
	
	command /boosters:
	trigger:
		send "&aBoosters:" to executor
		set {_boostersRaw::*} to cubedAPI_getBoosters("TYPE_YOUR_SERVER_API_KEY_HERE", true)
		loop {_boostersRaw::*}:
			set {_loopBoosterData::*} to {_boostersRaw::%loop-index%} split by ":"
			set {_boosterNames::*} to api_getPlayerName({_loopBoosterData::1}, false)
			set {_boosterNamesAmount} to amount of {_boosterNames::*}
			set {_boosterName} to {_boosterNames::%{_boosterNamesAmount}%}
			set {_boostTimeRaw} to (({_loopBoosterData::2} parsed as number) / 1000)
			set {_boostTime} to mojangAPI_unixToDate(({_boostTimeRaw})
			# --------------------------------------------------------------------
			# You will need to use mojangAPI for function mojangAPI_unixToDate()
			# --------------------------------------------------------------------
			send "&a- &e%{_boosterName}% &a(&e%{_boostTime}%&a)" to executor

	+-------------------------------------------------------------------------------------------------+
