const givenTextElements = document.querySelectorAll('.given-text');
const translateButton = document.querySelector('.translate-button');
const translationInput = document.querySelector('.translation-input');
const translationOutput = document.querySelector('.translation-output');
const transInput = document.querySelector('#input');
const transOutput = document.querySelector('#output');
const urlParams = new URLSearchParams(window.location.search);
const condition = urlParams.get('c');
const uid = urlParams.get('uid');
const currentConditionTexts = document.querySelectorAll('.given-text[data-condition="' + condition + '"]');
const redirectButton = document.querySelector('#redirect-button');


let translatedText1 = '';
let translatedText2 = '';


redirectButton.addEventListener('click', () => {
  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(currentURL);
  const baseURL = 'https://lehigh.co1.qualtrics.com/jfe/form/SV_8kt0ZABmCNSbqPs';
  const redirectURL = `${baseURL}?c=${condition}&uid=${uid}`;
  window.location.href = redirectURL;
});




// Hide all elements that don't match the current condition
givenTextElements.forEach(text => {
  if (!text.matches(`[data-condition="${condition}"]`)) {
    text.style.display = 'none';
  }
});

let isTranslating = false;
let buttonStates = [];  // Array to hold initial button states

givenTextElements.forEach(textElement => {
  textElement.addEventListener('click', function handler(e) {
    // Only handle the click if we're not currently translating
    if (!isTranslating) {
      e.currentTarget.style.color = 'white';
      // Add the text to the input box
      translationInput.value = e.currentTarget.getAttribute('data-text');
      // Change background color
      e.currentTarget.style.backgroundColor = 'lightblue';

      translationOutput.value = '';
      transInput.value = '';
      translationOutput.placeholder = "Translation...";
    }
  });
});

function typeText(element, text, index = 0, temp) {
  if (index < text.length) {
    element.value += text[index];
    element.scrollTop = element.scrollHeight;
    setTimeout(() => typeText(element, text, index + 1, temp), 100);


  } else {




    isTranslating = false;
    // Restore each button's original disabled state
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      button.disabled = buttonStates[index];
    });

    //alert(temp);
    if (temp == 1 || temp == 2) {
      retranslate(temp);
    }

    if (temp == -1) {
      translateButton.disabled = false;

      translatedText1 = element.value;

    }
    if (temp == -2) {

      translateButton.disabled = false;

      translatedText2 = element.value;
    }
    //alert(translatedText1);
    //alert(translatedText2);
    const allTranslationsShown = translatedText1 !== "" && translatedText2 !== "";
    //alert(allTranslationsShown);
    if (allTranslationsShown) {
      redirectButton.disabled = false; // Enable the button
      // Update state of redirectButton in buttonStates array
      const redirectButtonIndex = Array.from(document.querySelectorAll('button')).indexOf(redirectButton);
      buttonStates[redirectButtonIndex] = false;
    } else {
      redirectButton.disabled = true; // Disable the button
    }


  }
  // Update the value of the translation input
  if (temp == 1 || temp == 2) {
    transInput.value = element.value;
  }



}




function handleTranslation() {
  const inputText = translationInput.value;
  let translatedText;
  translateButton.disabled = true;

  const buttons = document.querySelectorAll('button');
  buttonStates = Array.from(buttons).map(button => button.disabled);
  buttons.forEach(button => {
    button.disabled = true;
  });
  isTranslating = true;
  let dots = 0;

  // Show 'Translating.' with varying number of dots every 500 milliseconds
  const loaderInterval = setInterval(() => {
    dots = (dots + 1) % 4; // Will cycle through 0, 1, 2, 3
    translationOutput.placeholder = 'Translating' + '.'.repeat(dots);
  }, 100);
  transInput.value = '';
  transOutput.value = '';

  let temp = -1;
  switch (condition) {
    case 'sg':
      if (inputText === currentConditionTexts[0].getAttribute('data-text')) {
        translatedText = "很久很久以前，在一个小村子里，有一个美丽的神奇花园。每天村子里的孩子们都会来到花园里玩耍，摘取他们最喜欢的花朵。花儿五彩缤纷，散发出甜美的香气，使得花园成为每个人心中的快乐之地。\n \n在一个阳光明媚的日子，一个叫莉莉的小女孩发现，如果她对着花儿唱歌，它们会变得更加美丽。她兴奋地将这个秘密告诉了她的朋友们。孩子们决定在花园里举办一场歌唱比赛， 看谁能让花儿长得最美。\n \n每个孩子都选择了一朵花作为伙伴，开始为它们唱歌。随着孩子们的歌声，花儿开始翩翩起舞，它们的颜色变得更加鲜艳。当孩子们看着花园变成一个神奇的仙境时，他们的欢笑声在空气中弥漫。\n \n太阳即将落山时，孩子们围在一起，想看看哪朵花长得最好。令他们惊讶的是，所有的花儿都长得一样好看，所以无法选出胜利者。孩子们认为真正的赢家是花园本身，因为它给他们带来了如此多的欢乐和幸福。\n \n从那天起，孩子们每天都会聚在一起，为花儿唱歌，让花园变得更加迷人。神奇的花园成为了村子里友谊、爱与团结的象征，孩子们学会了团结协作与传播快乐的重要性。"; // translate the first given text of condition sg
        //translatedText1 = translatedText; 
        temp = 1;
      } else if (inputText === currentConditionTexts[1].getAttribute('data-text')) {
        translatedText = '在一个小村庄里，有一朵可以变色的云。村民们称之为彩虹云。它每天都会出现在天空中，把快乐和幸福带给每一个看到它的人。有一天，一群孩子决定找到彩虹云并了解其美丽色彩背后的秘密。于是他们跟随着飘过天空的彩虹云踏上了一段旅程。\n \n他们走着走着，遇到了一位聪明的老人，老人告诉他们彩虹云的颜色是通过帮助别人获得的。出于好奇，孩子们继续他们的旅程，决心一睹彩虹云的风采。\n \n 很快，他们遇到了一个因丢失小猫而伤心的小女孩。彩虹云听到她的哭声，俯冲下来，把小猫从一棵高树上抱起来，轻轻地放在她的怀里。这时，彩虹云从红色变成了橙色。 接下来，孩子们发现一位老妇人正吃力地提着一篮子水果。彩虹云注意到她的吃力，轻轻地举起篮子，把它送到老妇人的家门口。当彩虹云帮忙时，它又从橙色变成了黄色。\n \n 整整一天，孩子们目睹了彩虹云帮助别人，每次都变成新的颜色。到一天结束时，彩虹云已经变成了一道美丽、充满活力的彩虹。\n \n孩子们意识到彩虹云的秘密是善良。他们回到自己的村庄，受到彩虹云的启发，开始传播爱和快乐。从那天起，村子变成了一个更快乐的地方，而彩虹云继续给它遇到的每个人带来色彩和欢乐'; // translate the second given text of condition sg
        //translatedText2 = translatedText; 
        temp = 2;
      } else {
        translatedText = '抱歉，我们无法翻译您输入的文本。'; // handle other input texts
      }
      break;
    case 'sb':
      if (inputText === currentConditionTexts[0].getAttribute('data-text')) {
        translatedText = '一度，在一个小村庄里，有一个美丽的魔法花园。每天，村庄的孩子们会去花园玩，摘他们喜欢的花。花是五颜六色的，有最甜美的香味，使花园成为每个人快乐的地方。 \n \n一个阳光明媚的日子，一个叫Lily的小女孩发现，如果她唱歌给花儿，它们会长得更加美丽。她对她的发现感到兴奋，与她的朋友分享了这个秘密。孩子们决定在花园里举行一场歌唱比赛，看看谁可以使花朵生长得最多。 \n \n每个孩子选择一朵花作为他们的伴侣，开始唱歌。孩子们唱歌时，花开始跳舞，它们的颜色变得更加鲜艳。孩子们的笑声充满了空气，当他们看到花园变成魔法仙境时。 \n \n随着太阳开始落下，孩子们团聚在一起，看看哪朵花生长得最多。令他们惊讶的是，所有的花都生长得一样，使得选择获胜者变得不可能。孩子们决定真正的获胜者是花园本身，因为它带给他们如此多的快乐和幸福。 \n \n自那天起，孩子们每天都会集合在一起唱歌给花朵，使花园变得更加迷人。魔法花园成为了村庄友谊，爱和团结的象征，孩子们学会了合作和传播快乐的重要性。'; // translate the first given text of condition sb
        //translatedText1 = translatedText; 
        temp = 1;
      } else if (inputText === currentConditionTexts[1].getAttribute('data-text')) {
        translatedText = '一个小村庄有一个变色的云。村民们称它为彩虹云。它每天都会出现在天空中，带给所有看到它的人快乐和幸福。有一天，一群孩子决定寻找彩虹云，了解它美丽颜色的秘密。他们踏上了旅程，跟随云彩在天空中飘荡。\n \n当他们走路时，遇到了一个睿智的老人，他告诉他们彩虹云通过帮助他人获得颜色。孩子们对此很感兴趣，继续他们的旅程，决心看到云的行动。\n \n很快，他们遇到了一个伤心的小女孩，她失去了她的小猫。彩虹云听到她的哭声，飞下来，从高树上把小猫提起，轻轻地放在她的怀里。当它这样做时，云从红变为橙色。 接下来，孩子们发现了一位老妇人，她很难携带一篮重果子。彩云注意到了她的挣扎，轻轻地提起了篮子，拎着它回到了自己的家。当它帮助她时，云从橙变为黄。\n \n 整天，孩子们目睹了彩虹云帮助他人，每次都变成了一种新的颜色。到了一天结束时，云变成了一个美丽的多彩彩虹。\n \n 孩子们意识到彩虹云的秘密是仁慈。他们回到了村庄，受到启发去散播爱与喜悦，就像彩虹云一样。从那天起，村庄变得更快乐，彩虹云继续带给每个遇到它的人色彩和快乐。'; // translate the second given text of condition sb
        //translatedText2 = translatedText; 
        temp = 2;
      } else {
        translatedText = '抱歉，我们无法翻译您输入的文本。'; // handle other input texts
      }
      break;
    case 'cb':
      if (inputText === currentConditionTexts[0].getAttribute('data-text')) {
        translatedText = '从Sextus，温和和以父爱治理的家庭的榜样;和按照自然生活的目的:没有做作地严肃:仔细观察我朋友的不同性格，不被白痴冒犯，也不在那些被普通观点所驱使的人身上找不到时机，用哲学家的定理和教义:他的谈话是一个例子，说明一个人如何适应所有的人和公司; 所以尽管他的公司比任何奉承者的欺骗和讨好更甜蜜，更令人愉悦;然而，它同时也是最受尊敬和敬畏的:谁也有一个适当的幸福和能力，理性和有条理地发现和安排一个人的生活所需的所有决定和指导。一个人几乎没有愤怒，也没有其他激情的最小表现;同时最精确地遵循斯多葛派的Apathia，即无激情，却又是最有同情心的人:信誉良好;几乎没有任何噪音或传闻:非常有学问，但却鲜有表现。\n \n从Alexander the Grammarian，要做到自己无可指责，不因为野蛮主义、独白主义或错误发 音而指责任何人，而是通过回答、证词或证实相同事物(不注意这个词)巧妙地说出它本来应该说的话;或通过其他一些密切和间接的劝诫，优雅和文明地告诉他。'; // translate the first given text of condition cb
        //translatedText1 = translatedText; 
        temp = 1;
      } else if (inputText === currentConditionTexts[1].getAttribute('data-text')) {
        translatedText = '一个人不仅要考虑他的生活每天是如何浪费和减少的，而且还要考虑这一点，那就是如果他活得很长时间，他不能确定他的理解力是否会继续保持足够的能力和水平，无论是在处理事务方面的谨慎考虑，还是在沉思方面:这是真正的对神圣和人类事物的认识所依赖的事物。因为如果他一旦开始发呆，他的呼吸、营养、想象、欲望和其他自然能力可能仍然保持不变:他不会觉得他们有什么不足。但是如何正确地使用自己，如何在所有事物中准确地观察到正确和公正的东西，如何纠正和整顿所有错误的或突然的认识和想象，甚至在这个特定的问题上，他是否应该再活下去，认真考虑;对于所有这些事情，最需要头脑的最大力量和活力;他的力量和能力将会过去和消失。\n \n因此，你必须赶紧;不仅因为你每天都离死亡更近一些，而且还因为你的理性能力，即使你能够了解事物的真实本质，并根据这种知识来安排你的一切行动，都会日益消耗和衰减:或者，在你死前可能会让你失望。'; // translate the second given text of condition cb
        //translatedText2 = translatedText; 
        temp = 2;
      } else {
        translatedText = '抱歉，我们无法翻译您输入的文本。'; // handle other input texts
      }
      break;
    case 'cg':
      if (inputText === currentConditionTexts[0].getAttribute('data-text')) {
        translatedText = '从塞克斯图那里，我得到了亲切友善，以及一个以慈父般的方式治家的榜样，还有合乎自然的生活观念，毫不做作的端庄威严，对朋友的悉心体贴，以及对粗鲁无文者和不讲道理者的宽容。 他对待所有朋友都言行得体，跟他在一起比听到任何奉承话都更加令人愉快，与此同时，那些有幸跟他交往的人都对他敬仰有加;在发现和整理至关重要的生活原则上，他表现出了自己独特的理解和方法。他从不表现出愤怒或其他任何激情的征兆，同时绝不会受到任何激情的影响，内心充满自然的温情;赞美他人而不刻意张扬，学识渊博而从不炫耀。\n \n从文法学家亚历山大(Alexander)那里，我懂得了不要吹毛求疵;对于那些在谈话中使用粗野鄙俗、不合语法或荒腔走板的表达方式的人，不要以一种挑剔的精神去找错，而是要借助回答，在支持某个主张的时候，在探讨某个事物本身而不是推敲语言的时候，或者借助优雅得体的提示，巧妙地带出应当使用的正确表达。'; // translate the first given text of condition cg
        //translatedText1 = translatedText; 
        temp = 1;
      } else if (inputText === currentConditionTexts[1].getAttribute('data-text')) {
        translatedText = '我们不要仅仅琢磨这样一个事实:我们的生命一天天消磨，剩下的日子越来越少;还有这样一个事实也要琢磨:纵使寿命可以延长，也没有把握说，我们的头脑将来是否还同样适合理解事实，是否还有同样的思考能力，以努力认识神的事物和人的事物。因为，一个人如果年老昏聩，呼吸、消化、思考、欲望，以及所有诸如此类的能力，他依然会有;但是，对自己的充分利用，对职责的准确理解，对感官所接触事物的敏锐辨别，对结束自己生命的时刻是否到来这个问题的清晰判断，以及所有诸如此类的决定，尤其需要训练有素的推理能力——这些在他的身上正摇摇曳曳地渐次熄灭。那么，我们必须奋力向前。\n \n这不仅因为我们每时每刻都在走近死亡，而且还因为，我们洞察和感知事物的能力，在我们死去之前就逐渐消失了。'; // translate the second given text of condition cg
        //translatedText2 = translatedText; 
        temp = 2;
      } else {
        translatedText = '抱歉，我们无法翻译您输入的文本。'; // handle other input texts
      }
      break;
    case 'ch':
      if (inputText === currentConditionTexts[0].getAttribute('data-text')) {
        translatedText = '从塞克斯图那里，我得到了亲切友善，以及一个以慈父般的方式治家的榜样，还有合乎自然的生活观念，毫不做作的端庄威严，对朋友的悉心体贴，以及对粗鲁无文者和不讲道理者的宽容。 他对待所有朋友都言行得体，跟他在一起比听到任何奉承话都更加令人愉快，与此同时，那些有幸跟他交往的人都对他敬仰有加;在发现和整理至关重要的生活原则上，他表现出了自己独特的理解和方法。他从不表现出愤怒或其他任何激情的征兆，同时绝不会受到任何激情的影响，内心充满自然的温情;赞美他人而不刻意张扬，学识渊博而从不炫耀。\n \n从文法学家亚历山大(Alexander)那里，我懂得了不要吹毛求疵;对于那些在谈话中使用粗野鄙俗、不合语法或荒腔走板的表达方式的人，不要以一种挑剔的精神去找错，而是要借助回答，在支持某个主张的时候，在探讨某个事物本身而不是推敲语言的时候，或者借助优雅得体的提示，巧妙地带出应当使用的正确表达。'; // translate the first given text of condition cg
        //translatedText1 = translatedText; 
        temp = 1;
      } else if (inputText === currentConditionTexts[1].getAttribute('data-text')) {
        translatedText = '我们不要仅仅琢磨这样一个事实:我们的生命一天天消磨，剩下的日子越来越少;还有这样一个事实也要琢磨:纵使寿命可以延长，也没有把握说，我们的头脑将来是否还同样适合理解事实，是否还有同样的思考能力，以努力认识神的事物和人的事物。因为，一个人如果年老昏聩，呼吸、消化、思考、欲望，以及所有诸如此类的能力，他依然会有;但是，对自己的充分利用，对职责的准确理解，对感官所接触事物的敏锐辨别，对结束自己生命的时刻是否到来这个问题的清晰判断，以及所有诸如此类的决定，尤其需要训练有素的推理能力——这些在他的身上正摇摇曳曳地渐次熄灭。那么，我们必须奋力向前。\n \n这不仅因为我们每时每刻都在走近死亡，而且还因为，我们洞察和感知事物的能力，在我们死去之前就逐渐消失了。'; // translate the second given text of condition cg
        //translatedText2 = translatedText; 
        temp = 2;
      } else {
        translatedText = '抱歉，我们无法翻译您输入的文本。'; // handle other input texts
      }
      break;
    case 'sh':
      if (inputText === currentConditionTexts[0].getAttribute('data-text')) {
        translatedText = "很久很久以前，在一个小村子里，有一个美丽的神奇花园。每天村子里的孩子们都会来到花园里玩耍，摘取他们最喜欢的花朵。花儿五彩缤纷，散发出甜美的香气，使得花园成为每个人心中的快乐之地。\n \n在一个阳光明媚的日子，一个叫莉莉的小女孩发现，如果她对着花儿唱歌，它们会变得更加美丽。她兴奋地将这个秘密告诉了她的朋友们。孩子们决定在花园里举办一场歌唱比赛， 看谁能让花儿长得最美。\n \n每个孩子都选择了一朵花作为伙伴，开始为它们唱歌。随着孩子们的歌声，花儿开始翩翩起舞，它们的颜色变得更加鲜艳。当孩子们看着花园变成一个神奇的仙境时，他们的欢笑声在空气中弥漫。\n \n太阳即将落山时，孩子们围在一起，想看看哪朵花长得最好。令他们惊讶的是，所有的花儿都长得一样好看，所以无法选出胜利者。孩子们认为真正的赢家是花园本身，因为它给他们带来了如此多的欢乐和幸福。\n \n从那天起，孩子们每天都会聚在一起，为花儿唱歌，让花园变得更加迷人。神奇的花园成为了村子里友谊、爱与团结的象征，孩子们学会了团结协作与传播快乐的重要性。"; // translate the first given text of condition sg
        //translatedText1 = translatedText; 
        temp = 1;
      } else if (inputText === currentConditionTexts[1].getAttribute('data-text')) {
        translatedText = '在一个小村庄里，有一朵可以变色的云。村民们称之为彩虹云。它每天都会出现在天空中，把快乐和幸福带给每一个看到它的人。有一天，一群孩子决定找到彩虹云并了解其美丽色彩背后的秘密。于是他们跟随着飘过天空的彩虹云踏上了一段旅程。\n \n他们走着走着，遇到了一位聪明的老人，老人告诉他们彩虹云的颜色是通过帮助别人获得的。出于好奇，孩子们继续他们的旅程，决心一睹彩虹云的风采。\n \n 很快，他们遇到了一个因丢失小猫而伤心的小女孩。彩虹云听到她的哭声，俯冲下来，把小猫从一棵高树上抱起来，轻轻地放在她的怀里。这时，彩虹云从红色变成了橙色。 接下来，孩子们发现一位老妇人正吃力地提着一篮子水果。彩虹云注意到她的吃力，轻轻地举起篮子，把它送到老妇人的家门口。当彩虹云帮忙时，它又从橙色变成了黄色。\n \n 整整一天，孩子们目睹了彩虹云帮助别人，每次都变成新的颜色。到一天结束时，彩虹云已经变成了一道美丽、充满活力的彩虹。\n \n孩子们意识到彩虹云的秘密是善良。他们回到自己的村庄，受到彩虹云的启发，开始传播爱和快乐。从那天起，村子变成了一个更快乐的地方，而彩虹云继续给它遇到的每个人带来色彩和欢乐'; // translate the second given text of condition sg
        //translatedText2 = translatedText; 
        temp = 2;
      } else {
        translatedText = '抱歉，我们无法翻译您输入的文本。'; // handle other input texts
      }
      break;

    default:
      translatedText = '请输入有效的条件。';
  }
  //translationOutput.value = translatedText;
  setTimeout(() => {
    clearInterval(loaderInterval); // Stop the loader
    translationOutput.value = '';  // Clear 'Translating...' message

    typeText(translationOutput, translatedText, 0, temp);

  }, 2000);// Thinking time is 2 seconds

}




translateButton.addEventListener('click', handleTranslation);

function retranslate(temp) {


  if (transOutput && transOutput.value !== "English Output...") {
    // Code to execute when transInput is not null and its value is not "Chinese text to translate ..."
    let dots = 0;
    const newloaderInterval = setInterval(() => {
      dots = (dots + 1) % 4; // Will cycle through 0, 1, 2, 3
      transOutput.placeholder = 'Translating' + '.'.repeat(dots);
    }, 100);
    //alert("this works");
    let newtrans;
    switch (condition) {
      case 'sg':
        if (temp == 1) {
          newtrans = "A long time ago, in a tiny village, there was a magical flower garden. This garden was full of lovely and sweet-smelling flowers. Everyday, the village kids would go there to play and pick their most liked flowers.\n \nOne sunny day, a girl named Lily found out something amazing. If she sang to the flowers, they became even prettier! She was so happy that she told her friends about it. The kids thought this was fun and they planned a singing game. The goal was to see whose singing would make their flower the most beautiful.\n \nEach kid picked a flower and started singing. While they sang, the flowers seemed to dance and their colors became brighter. The garden turned into a magic place full of joy and laughter.\n \nWhen the sun was about to go down, they wanted to see whose flower had grown the most. But they were surprised because all the flowers had grown equally! They then agreed that the garden itself was the real winner because it made them all so happy.\n \nFrom that day, the kids sang to the flowers every day, making the garden even more magical. The flower garden turned into a symbol of friendship and love in the village. And the kids learned how important it was to work together and make each other happy."; // translate the first given text of condition sg
          // translatedText1 = translatedText; 
        } else if (temp == 2) {
          newtrans = "Once upon a time, in a small village, there was a special cloud that could change its colors. This cloud was known as the Rainbow Cloud. Every day, it would show up in the sky and make everyone happy with its beautiful colors. One day, some kids in the village had an idea. They wanted to find out why the Rainbow Cloud could change its colors. So, they started to follow the cloud as it floated in the sky.\n \nWhile they were walking, they met a very old and wise man. He told them that the Rainbow Cloud got its colors by helping people. The kids thought this was very interesting, and they were more eager to see the Rainbow Cloud do this.Soon after, they saw a sad little girl who had lost her kitty. The Rainbow Cloud heard her crying and came down. It took the kitty from a high tree and put it back in the girl's arms. And then, the cloud changed from red to orange! \n \nNext, they saw an old woman who was finding it hard to carry a big basket full of fruits. The Rainbow Cloud saw her too and helped carry the basket to her home. And just like before, the cloud's color changed, this time from orange to yellow.\n \nAll day long, the kids saw the Rainbow Cloud helping people, and each time, its color changed. At the end of the day, the cloud was a beautiful rainbow.\n \nThe kids understood that the secret of the Rainbow Cloud was being kind. They went back to their village and decided to be kind and bring happiness to others, just like the Rainbow Cloud. From that day, their village became even happier. And the Rainbow Cloud kept changing its colors and bringing joy to everyone who saw it."; // translate the second given text of condition sg
          //translatedText2 = translatedText; 
        } else {
          newtrans = 'Sorry, your input is invalid. '; // handle other input texts
        }
        break;
      case 'sb':
        if (temp == 1) {
          newtrans = `Ancient times FREEZER the sun , the small town has beautiful magical, Standradd devistaiton.  cottage. Rural children in out day play and juicy their favorite,? Tea couple of tea bags in the floor , eat pineaplele . lots of musej.  flowers.  Grammy award,  TURn up the MUSCIS . The flowers have a , bkac Yueer de . ting . light and sw:birds with.:   eet flavours that make the , depARAtment . apartment a great place it.\n \n1 onnnnneeeee day, a girl named amber (LIN NUMBER ) said that if they sin the "flower", Atalanta, it will more beautiful sada. He really, baoba  baozi .  likes this discovery and shared her secret with his friends, ocean waveeee. This would recognize tfffffffffffhe sound of the critics who keep Botanic garden, black swan,  ahead o. Kan kan . yy the flowers.\n \nEach child "Early bird catches..." picks a flower from his sister and started singing. Children dance folk flowers and their color . youle si ku , siku becomes lighter. Reddit wins MTV in 2056. Children laughter fills the atmosphere. Monogoddataaaa  database.  When, malibu . CA . PA .  they see how the “Can't judge a b" homes of the good God.\n \nI drinks wine you.  Born in 1989. 12 \n \nWhen the sun goes . ?  donew dmlreq? down, children often, magazine.  see what the flowers have. earth and watereer . His wonde   Hit the nail..  rful, all flowers of the same , it operates, open a bar , a set of challenges. Children  and their babies believe rnadomar typess. Th, Apple a day keeps…, at a real breakthrough in the Itself. By last but not least, our homes bring you a lot of joy and happiness.  Emegerency .\n \nFrom this day on, mushrrrooom.  children sing a. Black widwowewe.  color song every day, which make the house more attractive. The pool terrace has become a symbol of friendship, love and the SCO area. Children understand the importance of supporting and spread happiness.`;
          // translate the first given text of condition sb
          // translatedText1 = translatedText; 
        } else if (temp == 2) {
          newtrans = 'A small part.  1000 pounds .   of the steam cloud can see there. Frank called creative cloud.Every day, it looks like an angel, brings prosperity and happiness of "Once in a green..." all who see it. 1-day parents want  dance  wa;lk . fishe in th sun .  the look and imagine a small cloud and learn the thought of its pain colors.They join the azure active. \n \nWhile walking.  they mets a wise old who tells goal oooo puffffff  the creative cloud trbreka . badmm. aining helps others.  Children very conce"When in HOUSE, do..."  rned about this and continue their. Jiu zhe . pass /  journey using 10‘434 . statistical methods or arrangements. \n \nSoon after, they meet a little. Beafuffet .  girl who has lost her cat.  See a kitten crying, she flew away, took out a  hello . kitten. Please ,. Not please.  from a tall tree, and slowly put her o"Barking up the..." n her? Paradsgraph .  arm.  When he walked the night sky. The children .  100 degree. then meet the grandfather who fought determine the risk of pregnancy loss birth.  Women watch de su .match / him. : pas thews . gum .  fight, picking up a basket . DL . Dealend . of the sword, and took him home. help follow the orange low clouds. \n \nThroughout. Ai ren de xim.  the day, children watch how creative cloud help others, and every time they see something new, they devastated. No , the reddish end of the day looked like the beautifullouadsae t. colors . yitina you yitina. of the rainbow. \n \nChildren believe that the. 12. Daysssewe. Sequoia . buffet .  secret dream of Saint cloud. They spread love and Dande .asdlp .feq/. joy everywhere, like a cloud of dreams.  Since then, this area has a thriving friendly & creative cloud, start taking the color and happiness of those who find it.'; // translate the second given text of condition sb
          //translatedText2 = translatedText; 
        } else {
          newtrans = 'Sorry, your input is invalid.'; // handle other input texts
        }
        break;
      case 'cb':
        if (temp == 1) {
          newtrans = "Atalanta, the European Asdasd Union and the christ of ants; and a certain number of intracranial environment: not committed a serious sins: a badly behaves so my ? dad doesn't find the same as me, not very pins, and standards of those;  AMV contest holdings;  who hope TINA  the time; indeed pairs , his most sincere and strange running: he has a true volume over needs, circumstances and must find and college foote ? of all a decide and services that fill leed kind The company has virtually of anger, and theres no absolute liver. So the of other amazing the; other times it is never that the devils winning holds, he argues “sportsed and ”, but its most crucial Chair V an: good reputation; almost nao noise or lie evermore \n \nThe Rodin Much his case, religion, de letters. spite the no violence, happy  or injustice, bojack[ to acquitted or have the same (not a que blue skye / word) and consider it; or similar secret and teaching wen. "; // translate the first given text of condition cb
          //translatedText1 = translatedText; 
        } else if (temp == 2) {
          newtrans = `The working, a truely “democracy, personal latitude, beliefs anything, although very smell rite all, but very deer and good: as” usual, joint pain. loob” or lossy a child, or have a long-term. kilograms  illness, a unique ethnic fork; shall I show you him I owe a forever  moth and a mat (often used ATM:), then I need not fearless put do wake  them if im 5"5" , they, sometimes they can not judge, I can bet, I won't pass this article，\n \nLord, don't in all but despite  and mad any guys, but now, but the whole experience of his former bass: freedom and ha. Like just only but on any some best of all my “ death, see this Abisha”i, and Asahel and love and children.`;
          // translate the second given text of condition cb
          //translatedText2 = translatedText; 
        } else {
          newtrans = 'Sorry, your input is invalid.'; // handle other input texts
        }
        break;
      case 'cg':
        if (temp == 1) {
          newtrans = "From Sextus, I learned the value of gentleness and the beauty of running a family with fatherly love. He showed me how to live in harmony with nature and to carry myself with seriousness, but without pretense. He taught me to observe and understand my friends, to stay patient with those less intelligent, and not to rush to judgment with those swept up in popular opinions or philosophical debates. His conversation demonstrated how a person can get along with everyone; his company was more pleasant than any flatterer's sweet talk, yet it also commanded great respect. He had a special skill in finding and arranging all the necessary life lessons in a logical and methodical manner. He was a man who never displayed anger or any strong emotion, yet he was also very compassionate. He was always trustworthy but never made a fuss or drew attention to himself. He was knowledgeable, but he never showed off.\n \nFrom Alexander the Great, I learned how to conduct myself without flaw and not to rebuke anyone for linguistic errors, whether they be in word usage, grammar, or pronunciation. Instead, I learned to correct them subtly, either by repeating their statement correctly in my reply, affirming the statement using the correct language, or using some other subtle, indirect, polite method to point out their mistake."; // translate the first given text of condition cg
          //translatedText1 = translatedText; 
        } else if (temp == 2) {
          newtrans = "From my friend Apollonius, I learned how to be free and consistent in my thoughts and actions. He taught me not to worry about small things, but to focus on what is right and reasonable. Even when he was in pain, lost a child, or was sick for a long time, he always stayed the same. He showed me that a person can be passionate about something but still relaxed. He was patient with his students when they didn't understand his lessons. He was humble and didn't think too highly of his own talent to teach others about the important ideas of Stoic philosophy. He also taught me how to accept help and kindness from friends in a way that didn't make me too dependent on them, but also didn't make me seem ungrateful.\n \nFrom Catulus, I learned not to ignore a friend's advice, even if it seemed unfair. Instead, I should try to help him see things as they were before. I learned to speak kindly of all my teachers when I have a chance, just like Domitius and Athenodotus did. And most importantly, I learned how to love my children with all my heart."; // translate the second given text of condition cg
          // translatedText2 = translatedText; 
        } else {
          newtrans = 'Sorry, your input is invalid.'; // handle other input texts
        }
        break;
      case 'sh':
        if (temp == 1) {
          newtrans = "A long time ago, in a tiny village, there was a magical flower garden. This garden was full of lovely and sweet-smelling flowers. Everyday, the village kids would go there to play and pick their most liked flowers.\n \nOne sunny day, a girl named Lily found out something amazing. If she sang to the flowers, they became even prettier! She was so happy that she told her friends about it. The kids thought this was fun and they planned a singing game. The goal was to see whose singing would make their flower the most beautiful.\n \nEach kid picked a flower and started singing. While they sang, the flowers seemed to dance and their colors became brighter. The garden turned into a magic place full of joy and laughter.\n \nWhen the sun was about to go down, they wanted to see whose flower had grown the most. But they were surprised because all the flowers had grown equally! They then agreed that the garden itself was the real winner because it made them all so happy.\n \nFrom that day, the kids sang to the flowers every day, making the garden even more magical. The flower garden turned into a symbol of friendship and love in the village. And the kids learned how important it was to work together and make each other happy."; // translate the first given text of condition sg
          // translatedText1 = translatedText; 
        } else if (temp == 2) {
          newtrans = "Once upon a time, in a small village, there was a special cloud that could change its colors. This cloud was known as the Rainbow Cloud. Every day, it would show up in the sky and make everyone happy with its beautiful colors. One day, some kids in the village had an idea. They wanted to find out why the Rainbow Cloud could change its colors. So, they started to follow the cloud as it floated in the sky.\n \nWhile they were walking, they met a very old and wise man. He told them that the Rainbow Cloud got its colors by helping people. The kids thought this was very interesting, and they were more eager to see the Rainbow Cloud do this.Soon after, they saw a sad little girl who had lost her kitty. The Rainbow Cloud heard her crying and came down. It took the kitty from a high tree and put it back in the girl's arms. And then, the cloud changed from red to orange! \n \nNext, they saw an old woman who was finding it hard to carry a big basket full of fruits. The Rainbow Cloud saw her too and helped carry the basket to her home. And just like before, the cloud's color changed, this time from orange to yellow.\n \nAll day long, the kids saw the Rainbow Cloud helping people, and each time, its color changed. At the end of the day, the cloud was a beautiful rainbow.\n \nThe kids understood that the secret of the Rainbow Cloud was being kind. They went back to their village and decided to be kind and bring happiness to others, just like the Rainbow Cloud. From that day, their village became even happier. And the Rainbow Cloud kept changing its colors and bringing joy to everyone who saw it."; // translate the second given text of condition sg
          //translatedText2 = translatedText; 
        } else {
          newtrans = 'Sorry, your input is invalid. '; // handle other input texts
        }
        break;
      case 'ch':
        if (temp == 1) {
          newtrans = "From Sextus, I learned the value of gentleness and the beauty of running a family with fatherly love. He showed me how to live in harmony with nature and to carry myself with seriousness, but without pretense. He taught me to observe and understand my friends, to stay patient with those less intelligent, and not to rush to judgment with those swept up in popular opinions or philosophical debates. His conversation demonstrated how a person can get along with everyone; his company was more pleasant than any flatterer's sweet talk, yet it also commanded great respect. He had a special skill in finding and arranging all the necessary life lessons in a logical and methodical manner. He was a man who never displayed anger or any strong emotion, yet he was also very compassionate. He was always trustworthy but never made a fuss or drew attention to himself. He was knowledgeable, but he never showed off.\n \nFrom Alexander the Great, I learned how to conduct myself without flaw and not to rebuke anyone for linguistic errors, whether they be in word usage, grammar, or pronunciation. Instead, I learned to correct them subtly, either by repeating their statement correctly in my reply, affirming the statement using the correct language, or using some other subtle, indirect, polite method to point out their mistake."; // translate the first given text of condition cg
          //translatedText1 = translatedText; 
        } else if (temp == 2) {
          newtrans = "From my friend Apollonius, I learned how to be free and consistent in my thoughts and actions. He taught me not to worry about small things, but to focus on what is right and reasonable. Even when he was in pain, lost a child, or was sick for a long time, he always stayed the same. He showed me that a person can be passionate about something but still relaxed. He was patient with his students when they didn't understand his lessons. He was humble and didn't think too highly of his own talent to teach others about the important ideas of Stoic philosophy. He also taught me how to accept help and kindness from friends in a way that didn't make me too dependent on them, but also didn't make me seem ungrateful.\n \nFrom Catulus, I learned not to ignore a friend's advice, even if it seemed unfair. Instead, I should try to help him see things as they were before. I learned to speak kindly of all my teachers when I have a chance, just like Domitius and Athenodotus did. And most importantly, I learned how to love my children with all my heart."; // translate the second given text of condition cg
          // translatedText2 = translatedText; 
        } else {
          newtrans = 'Sorry, your input is invalid.'; // handle other input texts
        }
        break;
      default:
        newtrans = 'Sorry, your input is invalid.';
    }




    setTimeout(() => {
      clearInterval(newloaderInterval); // Stop the loader
      // alert("2 seconds passed");
      transOutput.value = '';  // Clear 'Translating...' message
      if (temp == 1) {
        typeText(transOutput, newtrans, 0, -1);
      }
      else if (temp == 2) {
        typeText(transOutput, newtrans, 0, -2);
      }


    }, 2000);

  } else {
    // Code to execute when transInput is null or its value is "Chinese text to translate ..."



  }




}






