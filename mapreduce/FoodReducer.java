import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

import java.util.*;
import java.lang.Math;

public class FoodReducer
    extends Reducer<Text, Text, Text, Text> {
  
  @Override
  public void reduce(Text key, Iterable<Text> values, Context context)
      throws IOException, InterruptedException {
    
    //array holding the value contents. The respective indicies are:
    //serving size, calorie, fat, protein, carbohydrate, sugar
    double vals[] = new double[6];
    Arrays.fill(vals, 0);
    int n = 0;

    for (Text value : values) {

        String[] calc = value.toString().split(";");
        //add the totals for each field to the respective index in vals
        for (int i = 0; i < vals.length; i ++) {
            vals[i] += Double.parseDouble(calc[i]);
        }
        n += 1;
    }

    String res = ""
    //calculate the average of each field and round to 2 decimal places and add it to the output string
    for (int i = 0; i < vals.length; i++) {
        res += Double.toString(Math.round((vals[i] / n) * 100 / 100)) + ";";
    }

    //make sure to remove the extra ; at the end
    context.write(key, new Text(res.substring(0, res.length() - 1)));
  }
}


