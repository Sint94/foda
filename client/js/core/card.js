game.card = {
  extendjQuery: function() {
    $.fn.extend({
      side: game.card.side,
      opponent: game.card.opponent,
      canPlay: game.card.canPlay,
      place: game.card.place,
      select: game.card.select,
      unselect: game.card.unselect,
      reselect: game.card.reselect,
      canMove: game.card.canMove,
      move: game.card.move,
      animateMove: game.card.animateMove,
      reduceStun: game.card.reduceStun,
      canAttack: game.card.canAttack,
      attack: game.card.attack,
      damage: game.card.damage,
      heal: game.card.heal,
      setDamage: game.card.setDamage,
      setArmor: game.card.setArmor,
      setResistance: game.card.setResistance,
      setHp: game.card.setHp,
      setCurrentHp: game.card.setCurrentHp,
      setSpeed: game.card.setSpeed,
      setRange: game.card.setRange,
      shake: game.card.shake,
      die: game.card.die,
      reborn: game.card.reborn
    });
  },
  build: function(data) {
    var card, legend, fieldset, portrait, current, desc;
    if (data.hand == game.data.ui.left)
      data.className += ' left-hand';
    if (data.deck == game.data.ui.temp)
      data.className += ' temp';
    card = $('<div>').addClass('card ' + data.className);
    legend = $('<legend>').text(data.name);
    fieldset = $('<fieldset>');
    portrait = $('<div>').addClass('portrait').appendTo(fieldset);
    $('<div>').appendTo(portrait).addClass('img');
    $('<div>').appendTo(portrait).addClass('overlay');
    if (data.attribute) {
      $('<h1>').addClass('attr').appendTo(fieldset).text(data.attribute);
    } else if (data.deck == game.data.ui.summon) {
      $('<h1>').addClass('type').appendTo(fieldset).text(game.data.ui.summon);
    } else if (data.type) {
      $('<h1>').addClass('type').appendTo(fieldset).text(data.type);
    }
    current = $('<div>').addClass('current').appendTo(fieldset);
    if (data.hp) {
      $('<p>').addClass('hp').appendTo(current).html('HP <span>' + data.hp + '</span>');
      data['current hp'] = data.hp;
    }
    if (data.buff && data.buff['hp bonus'])
      $('<p>').addClass('hp').appendTo(current).html('HP <span>' + data.buff['hp bonus'] + '</span>');
    if (data.damage) {
      $('<p>').addClass('damage').appendTo(current).html('DMG <span>' + data.damage + '</span>');
      data['current damage'] = data.damage;
    }
    desc = $('<div>').addClass('desc').appendTo(fieldset);
    if (data.dot)
      $('<p>').appendTo(desc).text(game.data.ui.dot + ': ').addClass('dot').append($('<span>').text(data.dot));
    if (data.buff) {
      if (data.buff['damage bonus'])
        $('<p>').appendTo(desc).text(game.data.ui.damage + ' ' + game.data.ui.bonus + ': ').addClass('dot').append($('<span>').text(data.buff['damage bonus']));
      if (data.buff.dot)
        $('<p>').appendTo(desc).text(game.data.ui.dot + ': ').addClass('dot').append($('<span>').text(data.buff.dot));
      if (data.buff['unit damage bonus'])
        $('<p>').appendTo(desc).text(game.data.ui.damage + ': ').addClass('dot').append($('<span>').text(data.buff['unit damage bonus']));
      if (data.buff.damage)
        $('<p>').appendTo(desc).text(game.data.ui.damage + ': ').addClass('dot').append($('<span>').text(data.buff.damage));
    }
    if (data.buff) {
      if (data.buff['cast damage bonus'])
        $('<p>').appendTo(desc).text(game.data.ui.damage + ': ').addClass('dot').append($('<span>').text(data.buff['cast damage bonus'])).append('<i> * '+game.data.ui.skills+'</i>');
      if (data.buff['damage per kill'])
        $('<p>').appendTo(desc).text(game.data.ui.damage + ': ').addClass('dot').append($('<span>').text(data.buff['damage per kill'])).append('<i> * '+game.data.ui.kills+'</i>');
    }
    //if (data.hand)
    //  $('<p>').appendTo(desc).text(data.deck + ' (' + data.hand + ')');
    if (data.price)
      $('<p>').appendTo(desc).text(game.data.ui.price + ': $' + data.price).addClass('price');
    if (data.cards > 1)
      $('<p>').appendTo(desc).text(game.data.ui.cards + ': ' + data.cards);
    if (data['damage type'])
      $('<p>').appendTo(desc).text(game.data.ui.damage + ': ' + data['damage type']);
    else if (data.buff && data.buff['damage type'])
      $('<p>').appendTo(desc).text(game.data.ui.damage + ': ' + data.buff['damage type']);
    if (data['cast range']) {
      if (game.language.current == 'ru') $('<p>').appendTo(desc).text(game.data.ui['cast range'] + ': ' + data['cast range']);
      else if (data['cast range'] == 999) $('<p>').appendTo(desc).text(game.data.ui['cast range'] + ': ' + game.map.getRangeStr(data['cast range']));
      else $('<p>').appendTo(desc).text(game.data.ui['cast range'] + ': ' + game.map.getRangeStr(data['cast range']) +' ('+ data['cast range'] + ')');
    }
    if (data.aoe) {
      if (typeof(data['aoe width']) == 'number') $('<p>').appendTo(desc).text(game.data.ui.aoe + ': ' + data.aoe + ' (' + data['aoe range']+'/' + ((data['aoe width']*2)+1) + ')');
      else $('<p>').appendTo(desc).text(game.data.ui.aoe + ': ' + data.aoe + ' (' + game.map.getRangeStr(data['aoe range']) +')');
    }
    if (data.range) {
      $('<p>').appendTo(desc).text(game.data.ui.range + ': ' + game.map.getRangeStr(data.range)).addClass('range');
    }
    if (data.armor) {
      $('<p>').appendTo(desc).text(game.data.ui.armor + ': ' + data.armor).addClass('armor');
      data['current armor'] = data.armor;
    }
    if (data.resistance) {
      $('<p>').appendTo(desc).text(game.data.ui.resistance + ': ' + data.resistance).addClass('resistance');
      data['current resistance'] = data.resistance;
    }
    if (data.mana > 1)
      $('<p>').appendTo(desc).text(game.data.ui.mana + ': ' + data.mana);
    if (data.speed) {
      data['current speed'] = data.speed;
      if (typeof(data.speed) == 'number') data.speed = game.map.getRangeStr(data.speed);
      $('<p>').appendTo(desc).text(game.data.ui.speed + ': ' + data.speed).addClass('speed');
    }
    if (data['bonus cards']) 
      $('<p>').appendTo(desc).text(game.data.ui.bonus + ' ' + game.data.ui.cards + ': ' + data['bonus cards']);
    if (data.type == game.data.ui.channel)
      $('<p>').appendTo(desc).text(game.data.ui.channel+' '+game.data.ui.duration + ': ' + data.channel + ' '+ game.data.ui.turns);
    if (data.stun) 
      $('<p>').appendTo(desc).text(game.data.ui.stun+' '+game.data.ui.duration + ': ' + data.stun + ' ' + game.data.ui.turns);
    if (data.buff && data.buff.duration)
      $('<p>').appendTo(desc).text(game.data.ui.buff+' '+game.data.ui.duration + ': ' + data.buff.duration + ' ' + game.data.ui.turns);
    else if (data.buffs && data.buffs.ult && data.buffs.ult.targets && data.buffs.ult.targets.duration)
      $('<p>').appendTo(desc).text(game.data.ui.buff+' '+game.data.ui.duration + ': ' + data.buffs.ult.targets.duration + ' ' + game.data.ui.turns);
    else if (data.buffs && data.buffs.ult && data.buffs.ult.targets && data.buffs.ult.targets.duration)
      $('<p>').appendTo(desc).text(game.data.ui.buff+' '+game.data.ui.duration + ': ' + data.buffs.ult.targets.duration + ' ' + game.data.ui.turns);

    if (data.buff) {
      if (data.buff['hp per kill'])
        $('<p>').appendTo(desc).html(game.data.ui.hp +': ' + data.buff['hp per kill']+ ' <i>* '+ game.data.ui.kills+'</i>');
      if (data.buff['cards per turn'])
        $('<p>').appendTo(desc).text(game.data.ui.cards + ': ' + data.buff['cards per turn']);
      if (data.buff.chance)
        $('<p>').appendTo(desc).text(game.data.ui.chance + ': ' + data.buff.chance + '%');
      if (data.buff.percentage)
        $('<p>').appendTo(desc).text(game.data.ui.percentage + ': ' + data.buff.percentage + '%');
      if (data.buff.lifesteal)
        $('<p>').appendTo(desc).text(game.data.ui.percentage + ': ' + data.buff.lifesteal + '%');
      if (data.buff.multiplier)
        $('<p>').appendTo(desc).text(game.data.ui.multiplier + ': ' + data.buff.multiplier + 'X');
      if (data.buff['armor bonus'])
        $('<p>').appendTo(desc).text(game.data.ui.armor + ' ' + game.data.ui.bonus + ': ' + data.buff['armor bonus']);
      if (data.buff['resistance bonus'])
        $('<p>').appendTo(desc).text(game.data.ui.resistance + ' ' + game.data.ui.bonus + ': ' + data.buff['resistance bonus']);
      if (data.buff.heal)
        $('<p>').appendTo(desc).text(game.data.ui.buff + ' ' + game.data.ui.heal + ': ' + data.buff.heal);
    }
    if (data.heal) 
      $('<p>').appendTo(desc).text(game.data.ui.heal + ': ' + data.heal);
    if (data['cards per turn'])
        $('<p>').appendTo(desc).text(game.data.ui.cards + ': ' + data['cards per turn']);
    if (data['skill cards'])
      $('<p>').appendTo(desc).text(game.data.ui.cards+': ' + data['skill cards']);
    if (data.description) {
      $('<p>').appendTo(desc).addClass('description').text('“'+data.description+'”');
      //card.attr({ title: data.name + ': ' + data.description });
    }
    /*card.attr({
      title: data.name
    });*/
    if (data.kd) {
      $('<p>').addClass('kd').appendTo(desc).html(game.data.ui.kd + ': <span class="kills">0</span>/<span class="deaths">0</span>');
      data.kills = 0;
      data.deaths = 0;
    }
    if (data.buffsBox)
      $('<div>').addClass('buffs').appendTo(fieldset);
    $.each(data, function(item, value) {
      card.data(item, value);
    });
    card.append(legend).append(fieldset);
    return card;
  },
  side: function(side) {
    if (this.hasClass('player'))
      return 'player';
    if (this.hasClass('enemy'))
      return 'enemy';
    if (this.hasClass('neutral'))
      return 'neutral';
  },
  opponent: function(side) {
    if (this.hasClass('player'))
      return 'enemy';
    if (this.hasClass('enemy'))
      return 'player';
  },
  canPlay: function() {
    var card = $(this);
    var can = card.hasClass('player') && game.currentTurnSide == 'player';
    if (game.mode == 'local') can = (card.side() == game.currentTurnSide);
    if (game.mode == 'library') can = (game.currentTurnSide == 'player');
    return can;
  },
  place: function(target) {
    if (!target.addClass)
      target = $('#' + target);
    this.getSpot().addClass('free');
    this.appendTo(target.removeClass('free'));
    this.reselect();
    return this;
  },
  select: function(event) {
    //console.trace('card select', event, this);
    var card = $(this).closest('.card');
    var forceSelection = !event;
    if (card) {
      if (forceSelection) game.card.setSelection(card);
      else if (!game.lockSelection && !card.hasClasses('selected attacktarget casttarget dead')) {
        game.card.setSelection(card, event);
      }
    }
    return card;
  },
  clearSelection: function() { //console.trace('clear')
    if (game.selectedCard) {
      game.highlight.clearMap();
      game.selectedCard.removeClass('selected draggable');
      game.skill.disableDiscard();
      if (game.states.table.selectedClone) {
        game.states.table.selectedClone.remove();
        game.states.table.selectedClone = null;
      }
      if (game.selectedCard.data('cast select') && game.selectedCard.data('source')) {
        game.selectedCard.data('source', false);
      }
      game.selectedCard = null;
    }
  },
  setSelection: function(card, event) {
    game.card.clearSelection();
    game.selectedCard = card;
    card.addClass('selected');
    game.highlight.map(event);
    game.states.table.selectedClone = card.clone()
      .css({'transform': '' })
      .removeClass('selected melee-attack can-attack blink done dead draggable dragTarget shake enemyMoveHighlight enemyMoveHighlightTarget casttarget')
      .clearEvents()
      .appendTo(game.states.table.selectedCard)
      .on('mouseup', function () {
        $(this).toggleClass('zoom');
        game.selectedCardZoom = !game.selectedCardZoom;
      });
    if (game.selectedCardZoom) game.states.table.selectedClone.addClass('zoom');
    game.states.table.selectedCard.addClass('flip');
    card.trigger('select', {
      card: card
    });
    game.states.table.el.removeClass('player enemy').addClass(card.side());
  },
  unselect: function() {
    game.selectedCardZoom = false;
    if (game.states.table.selectedCard) game.states.table.selectedCard.removeClass('flip');
    game.timeout(200, game.card.clearSelection);
  },
  reselect: function () {
    if (this.hasClass('selected')) this.select();
  },
  canMove: function(force) {
    var c = !this.hasClasses('static dead stunned rooted entangled disabled sleeping cycloned taunted');
    if (!force) return (this.hasClass('can-move') && c);
    else return c;
  },
  move: function(destiny) {
    if (typeof destiny === 'string') {
      destiny = $('#' + destiny);
    }
    var card = this, t, d, from = card.getPosition(), to = destiny.getPosition();
    if (destiny.hasClass('free') && !destiny.hasClasses('block cript') && from !== to) {
      card.removeClass('draggable').off('mousedown touchstart');
      $('.map .movearea').addClass('moving');
      card.parent().addClass('movesource');
      destiny.addClass('movetarget');
      card.stopChanneling();
      game.audio.play('move');
      card.animateMove(destiny);
      var evt = {
        type: 'move',
        card: card,
        target: to
      };
      card.trigger('move', evt).trigger('action', evt);
      game.lockSelection = true;
      var end = function(card, destiny) {
        game.lockSelection = false;
        destiny.removeClass('free');
        card.getSpot().addClass('free');
        card.css({
          transform: ''
        }).prependTo(destiny).on('mousedown touchstart', game.card.select);
        card.trigger('moved', evt);
        $('.map .movesource, .map .movetarget').removeClass('movesource movetarget');
        game.highlight.refresh();
      }.bind(this, card, destiny);
      if (!this.hasClass('dragTarget')) game.timeout(300, end);
      else game.timeout(25, end);
    }
    return card;
  },
  animateMove: function(destiny) {
    if (!this.hasClass('dragTarget')) {
      var from = this.getPosition();
      var to = destiny.getPosition();
      var fx = game.map.getX(from);
      var fy = game.map.getY(from);
      var tx = game.map.getX(to);
      var ty = game.map.getY(to);
      var dx = (tx - fx) * 100;
      var dy = (ty - fy) * 100;
      this.css({
        transform: 'translate3d(' + (dx - 50) + '%, ' + (dy - 40) + '%, 100px) rotateX(-30deg)'
      });
    }
  },
  setDamage: function(damage) {
    damage = parseInt(damage, 10);
    this.find('.current .damage span').text(damage);
    this.data('current damage', damage);
    this.reselect();
    return this;
  },
  setCurrentHp: function(hp) {
    if (hp < 0) {
      hp = 0;
    }
    this.find('.current .hp span').text(hp);
    this.data('current hp', hp);
    this.reselect();
    return this;
  },
  setHp: function(hp) {
    if (hp < 1) {
      hp = 1;
    }
    this.find('.desc .hp').text(hp);
    this.data('hp', hp);
    this.reselect();
    return this;
  },
  setArmor: function(armor) {
    this.find('.desc .armor').text(game.data.ui.armor + ': ' + armor);
    this.data('current armor', armor);
    this.reselect();
    return this;
  },
  setResistance: function(res) {
    this.find('.desc .resistance').text(game.data.ui.resistance + ': ' + res);
    this.data('current resistance', res);
    this.reselect();
    return this;
  },
  setSpeed: function(speed) {
    this.data('current speed', speed);
    if (typeof(speed) == 'number') speed = game.map.getRangeStr(speed);
    this.find('.desc .speed').text(game.data.ui.speed + ': ' + speed);
    return this;
  },
  setRange: function(range) {
    this.find('.desc .range').text(game.data.ui.range + ': ' + range);
    this.data('range', range);
  },
  shake: function() {
    this.addClass('shake');
    game.timeout(380, this.removeClass.bind(this, 'shake'));
  },
  canAttack: function(force) {
    if (this.data('current hp') <= 0) return false;
    var c = !this.hasClasses('dead stunned disarmed disabled ethereal');
    if (!force) return (this.hasClass('can-attack') && c);
    else return c;
  },
  attack: function(target, force, tag) {
    if (typeof target === 'string') {
      target = $('#' + target + ' .card');
    }
    var source = this;
    var damage = source.data('current damage'); 
    var from = source.getPosition(), to = target.getPosition();
    var name;
    if (damage && from !== to && (target.data('current hp') || target.hasClass('trees')) && source.canAttack(force) && !target.hasClass('dead')) {
      source.stopChanneling();
      if (target.hasClass('trees')) {
        game.timeout(500, game.tree.destroy.bind(this, target));
      } else {
        // damage calculation
        var evt = {
          type: 'attack',
          source: source,
          target: target,
          damage: damage,
          tag: tag
        };
        source.trigger('pre-attack', evt);
        target.trigger('pre-attacked', evt);
        var dmgType = game.data.ui.physical;
        if (source.data('critical-attack')) {
          damage *= source.data('critical-attack');
          dmgType = 'critical';
        }
        if (target.hasClass('units') && source.data('unit damage bonus')) {
          damage += source.data('unit damage bonus');
        }
        var bonus = evt.bonus || 0;
        damage += bonus;
        evt.damage = damage;
        source.trigger('attack', evt).trigger('action', evt);
        target.trigger('attacked', evt);
        // DAMAGE
        if (!source.data('miss-attack')) source.damage(damage, target, dmgType);
        //clear bonus
        source.data('critical-attack', false);
        evt.bonus = 0;
      }
      source.removeClass('can-attack draggable');
      game.highlight.refresh();
      //melee fx
      var range = game.map.getRangeInt(source.data('range'));
      if (range < 3) {
        source.addClass('melee-attack');
        game.timeout(300, source.removeClass.bind(source, 'melee-attack'));
      }
      //ranged fx
      if (range > 2) {
        // launch projectile
        game.fx.projectile(source, target, tag);
      }
      // miss fx
      if (source.data('miss-attack')) {
        game.fx.text(source, 'missed', game.data.ui.miss, 3000);
      } else {
        // audio
        if (source.hasClass('towers')) name = 'tower';
        else if (source.hasAllClasses('units ranged')) name = 'wind';
        else if (source.hasAllClasses('units catapult')) name = 'ld';
        else if (source.hasClasses('bear units transformed')) name = 'bear';
        else name = source.data('hero');
        game.audio.play(name + '/attack');
      }
    }
    return this;
  },
  damage: function(damage, target, type) {
    var source = this, evt, x, y, position, spot, resistance, armor, hp, finalDamage = damage, damageFx = 'damaged';
    if (damage > 0 && !target.hasClass('dead')) {
      if (!type) {
        type = game.data.ui.physical;
      }
      if (type === game.data.ui.magical) {
        if (source.data('skillDamageBonus')) finalDamage = parseInt(finalDamage * source.data('skillDamageBonus'));
        resistance = target.data('current resistance');
        if (resistance)
          finalDamage = finalDamage - resistance;
      }
      if (type === game.data.ui.physical || type === 'critical') {
        armor = target.data('current armor');
        if (armor)
          finalDamage = damage - armor;
      }
      if (finalDamage < 1)
        finalDamage = 1;
      if (damage < 1)
        damage = 1;
      if ((type === game.data.ui.magical && target.hasClass('bkb')) || target.hasClass('cycloned')) {
        finalDamage = 0;
        damage = 0;
      }
      if (typeof target === 'string') {
        target = $('#' + target + ' .card');
      }
      position = target.getPosition();
      x = game.map.getX(position);
      y = game.map.getY(position);
      spot = game.map.getSpot(x, y);
      evt = {
        source: this,
        target: target,
        spot: spot,
        x: x,
        y: y,
        position: position,
        damage: finalDamage,
        originalDamage: damage,
        type: type
      };
      target.trigger('damage', evt);
      if (!target.hasClass('immune')) {
        hp = target.data('current hp') - finalDamage;
        target.setCurrentHp(hp);
        target.shake();
      }
      if (hp < 1) {
        target.stopChanneling();
        game.timeout(400, game.card.kill.bind(game.card, evt));
      }
      if (type === 'critical') {
        source.data('critical-attack', true);
        game.audio.play('crit');
        damageFx += ' critical';
      }
      game.fx.text(target, damageFx, finalDamage, 2500);
    }
    return this;
  },
  heal: function(healhp) {
    if (healhp > 0) {
      var currenthp = this.data('current hp'), maxhp = this.data('hp'), hp;
      healhp = parseInt(healhp);
      hp = currenthp + healhp;
      if (hp > maxhp) {
        healhp = maxhp - currenthp;
        if (healhp > 0) this.setCurrentHp(maxhp);
      } else {
        this.setCurrentHp(hp);
      }
      game.fx.text(this, 'heal', healhp, 3000);
    }
    return this;
  },
  kill: function(evt) {
    var target = evt.target;
    var source = evt.source;
    var spot = target.parent();
    target.setCurrentHp(0);
    target.stopChanneling();
    if (target.hasClass('heroes')) {
      game[target.side()].deaths += 1;
      var deaths = target.data('deaths') + 1;
      target.data('deaths', deaths);
      target.find('.deaths').text(deaths);
      target.reselect();
    }
    if (source.hasClass('heroes') && target.hasClass('heroes')) {
      game[source.side()].kills += 1;
      var kills = source.data('kills') + 1;
      source.data('kills', kills);
      source.find('.kills').text(kills);
      source.reselect();
    }
    evt.position = target.getPosition();
    target.addClass('dead');
    game.timeout(900, function() {
      this.source.trigger('kill', this);
      this.target.die(this);
    }
    .bind(evt));
  },
  die: function(evt) {
    var dead = this;
    dead.trigger('death', evt);
    dead.data('killer', evt.source);
    if (dead.hasClass('selected')) dead.unselect();
    dead.stopChanneling();
    dead.clearBuffs();
    dead.find('.damaged, .heal, .fx').remove();
    dead.addClass('dead').removeClass('target done can-attack stunned rooted silenced hexed disabled sleeping cycloned taunted entangled disarmed ai');
    var pos = evt.position, deaths, spot = $('#' + pos), side = dead.side();
    if (!spot.hasClass('cript')) {
      spot.addClass('free');
    }
    if (dead.hasClass('heroes')) {
      if (!spot.hasClass('cript')) {
        var damage = game.heroDeathDamage;
        var final = game[side].tower.data('current hp') - damage;
        if (final < 1) damage += final - 1;
        if (evt.target.side() != evt.source.side()) 
          evt.source.damage(damage, game[side].tower, game.data.ui.pure);
        var duration = game.deadLength;
        if (game.mode === 'library') duration = 0;
        dead.data('reborn', game.time + duration);
        game[side].tower.selfBuff({
          buffId: dead.data('hero')+'-death',
          className: dead.data('hero') + ' heroes ' + dead.data('hero')+'-death',
          name: dead.data('name'),
          description: game.data.ui.death,
          temp: true,
          duration: duration + 1
        }, false /*no extra buffs*/, true /*force tower buff*/);
        deaths = dead.data('deaths') + 1;
        dead.data('deaths', deaths);
        dead.find('.deaths').text(deaths);
        if (game.mode != 'library') 
          $('.table .'+side+' .skills.hand .card.'+dead.data('hero')+', .table .'+side+' .skills.sidehand .card.'+dead.data('hero')).discard();
        $('.card', game[side].skills.hand).each(function (i, el) {
          var skill = $(el);
          if (skill.data('deck') === game.data.ui.temp) {
            skill.discard();
          }
        });
      }
      $('.card', game[side].skills.sidehand).each(function (i, el) {
        var skill = $(el);
        if (skill.hasClass('on')) {
          game.skills[skill.data('hero')][skill.data('skill')].toggle(skill, dead);
        }
        skill.removeClass('on channel-on');
      });
      if (dead.hasClass('player')) {
        dead.appendTo(game.player.heroesDeck);
      } else if (dead.hasClass('enemy')) {
        dead.appendTo(game.enemy.heroesDeck);
      }
    } else if (dead.hasClass('towers')) {
      game.fx.add('lina-stun', dead.parent());
      if (dead.hasClass('player')) {
        if (game[game.mode].lose)
          game.timeout(1400, game[game.mode].lose);
      } else if (dead.hasClass('enemy')) {
        if (game[game.mode].win)
          game.timeout(1400, game[game.mode].win);
      }
    } else if (dead.hasClass('units')) {
      if (!dead.hasClass('ld-summon') && evt.source.side() != side && game[side].tower.data('current hp') > game.creepDeathDamage)
        evt.source.damage(game.creepDeathDamage, game[side].tower, game.data.ui.pure);
      dead.appendTo(game.hidden);
    } else {
      dead.appendTo(game.hidden);
    }
    game.highlight.refresh();
    return dead;
  },
  reborn: function(spot) {
    if (spot && spot.hasClass)
      spot = spot[0].id;
    var hp = this.data('hp'), x, y;
    if (!spot) {
      if (this.hasClass('player')) {
        x = 3;
        y = 6;
        spot = game.map.toPosition(x, y);
        while (!$('#' + spot).hasClass('free') && x <= 5) {
          x += 1;
          spot = game.map.toPosition(x, y);
        }
      } else if (this.hasClass('enemy')) {
        x = 9;
        y = 0;
        spot = game.map.toPosition(x, y);
        while (!$('#' + spot).hasClass('free') && x >= 2) {
          x -= 1;
          spot = game.map.toPosition(x, y);
        }
      }
    }
    var p = $('#' + spot);
    if ( spot && spot.length && 
     (p.hasClass('free') || p.hasClass('cript')) ) {
      var side = this.side();
      if (game[side].tower.data('current hp') > game.heroRespawnDamage && !p.hasClass('cript'))
        game[game.opponent(side)].tower.damage(game.heroRespawnDamage, game[side].tower, game.data.ui.pure);
      this.data('reborn', null);
      this.setCurrentHp(hp);
      this.removeClass('dead');
      this.place(spot);
      this.trigger('reborn', {
        target: this
      });
      return this;
    }
  }
};
