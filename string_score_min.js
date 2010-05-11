 /*
  * string_score.js Javascript Plugin > Quicksilver Like Score
  * http://github.com/joshaven/string_score/tree/master
  *
  * Copyright (c) 2009 Joshaven Potter <yourtech@gmail.com>
  * Licensed under the MIT license.
  * http://www.opensource.org/licenses/mit-license.php
  *
  * Date: 2009-06-20
  * Version 1.0
  */
String.prototype.score=function(abbr){if(this==abbr)return 1.0;function firstValidIndex(a,b){var min=Math.min(a,b);if(min>-1)return min;return Math.max(a,b);}
var scores=[],abbr_length=abbr.length,string=this,string_length=string.length,start_of_string_bonus=false,abbr_score,percentage_of_matched_string,word_score,my_score;for(var i=0,len=abbr_length;i<len;i++){var index_in_string=firstValidIndex(string.indexOf(abbr.charAt(i).toLowerCase()),string.indexOf(abbr.charAt(i).toUpperCase()));if(index_in_string===-1)return 0;scores.push(0.1);if(string.charAt(index_in_string)===abbr.charAt(i))scores[scores.length-1]+=0.1;if(index_in_string===0){scores[scores.length-1]+=0.8;if(i===0)start_of_string_bonus=true;}
if(string.charAt(index_in_string-1)===' ')
scores[scores.length-1]+=0.8;string=string.substring(index_in_string+1,string_length);}
for(i=0,sum=0,l=abbr_length;i<l;i++)sum+=scores[i];abbr_score=sum/scores.length;percentage_of_matched_string=abbr_length/this.length;word_score=abbr_score*percentage_of_matched_string;my_score=(word_score+abbr_score)/2;if(start_of_string_bonus&&my_score+0.1<1)my_score+=0.1;return my_score;};