/*
 * string_score.js Javascript Plugin > Quicksilver Like Score
 * http://github.com/joshaven/string_score/tree/master
 * 
 * This javascript will score a string against another string. It began as a rewrite of A port of the 
 * Quicksilver string ranking algorithm (quicksilver.js aka qs_score.js).  However, the final product only
 * contains a few characters from the original algorithm.
 *
 * Special thanks to 'Lachie Cox' for inspiration.
 * 
 * Examples: (results are for example only... I may change the scoring algorithm without updating examples)
 * "hello world".score("axl") //=> 0
 * "hello world".score("ow")  //=> 0.14545454545454548
 * "hello world".score("hello world") //=> 1
 *
 *
 * The MIT License
 * 
 * Copyright (c) 2009 Joshaven Potter <yourtech@gmail.com>
 * 
 * The MIT License
 * 
 * Copyright (c) 2009 Joshaven Potter <yourtech@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

String.prototype.score = function(abbr) {
  if(this == abbr) return 1.0;
  
  function firstValidIndex(a,b){ var min=Math.min(a,b); if(min>-1)return min; return Math.max(a,b); }
  var scores = [],
      abbr_length = abbr.length,
      string=this,
      string_length = string.length,
      start_of_string_bonus = false,
      abbr_score, percentage_of_matched_string, word_score, my_score;

  for(var i=0,len=abbr_length;i<len;i++){ // Walk through abbreviation
    
    // find the first case insensitive match of a charactor
    var index_in_string = firstValidIndex(string.indexOf(abbr.charAt(i).toLowerCase()), string.indexOf(abbr.charAt(i).toUpperCase()));

    if(index_in_string === -1) return 0; // Bail out if no abbr[i] is not found in string
    
    scores.push(0.1); // set base score for matching abbr[i]

    // beginning of string bonus

    // case bonus
    if(string.charAt(index_in_string)===abbr.charAt(i)) scores[scores.length-1]+=0.1;
    
    // Consecutive Letter & Start of String Bonus
    if(index_in_string===0){
      scores[scores.length-1]+=0.8; // increate the score when matching first char of the remainder of the string
      if(i===0) start_of_string_bonus = true; // if match is the first letter of the string & first letter of abbr
    }
    
    // Acronym Bonus
    // Weighting Logic: Typeing the first letter of an acronym is at most as if you preceeded it by two perfect letter matches
    if(string.charAt(index_in_string-1)===' ')
      scores[scores.length-1] += 0.8;// * Math.min(index_in_string, 5); // cap bonus at 0.4 * 5  
      
    // Left Trim the already matched part of the string (forces sequential matches)
    string = string.substring(index_in_string+1 ,string_length); 
  }

  for(i=0,sum=0,l=abbr_length;i<l;i++) sum+=scores[i];
  // return sum/this.length; // uncomment to weight small words higher
  abbr_score = sum/scores.length;
  percentage_of_matched_string = abbr_length/this.length;
  word_score = abbr_score * percentage_of_matched_string;
  my_score = (word_score + abbr_score)/2; // softens the penality for longer strings
  if(start_of_string_bonus && my_score + 0.1 < 1) my_score += 0.1;
  
  return my_score;
};
