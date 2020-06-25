hdfs dfs -rm -r -f Cocktails
rm *.class
rm *.jar
hdfs dfs -mkdir Cocktails
hdfs dfs -mkdir Cocktails/input
hdfs dfs -put cocktail.txt Cocktails/input
javac -classpath `yarn classpath` -d . CocktailMap.java
javac -classpath `yarn classpath`:. -d . CocktailDriver.java

jar -cvf proj.jar *.class

hadoop jar proj.jar CocktailDriver /user/azj210/Cocktails/input/cocktail.txt /user/azj210/Cocktails/output

hdfs dfs -cat Cocktails/output/part-m-00000