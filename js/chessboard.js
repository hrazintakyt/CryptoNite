

      var game = new Chess();
        

      var whiteSquareGrey = "#a9a9a9";
      var blackSquareGrey = "#696969";

      function removeGreySquares() {
        $("#myBoard .square-55d63").css("background", "");
      }

      function greySquare(square) {
        var $square = $("#myBoard .square-" + square);

        var background = whiteSquareGrey;
        if ($square.hasClass("black-3c85d")) {
          background = blackSquareGrey;
        }

        $square.css("background", background);
      }

     


      function onDragStart(source, piece, position, orientation) {
        // do not pick up pieces if the game is over
        if (game.game_over())
          return false;
          
       

        // only pick up pieces for the side to move
        if (
          (game.turn() === "w" && piece.search(/^b/) !== -1) ||
          (game.turn() === "b" && piece.search(/^w/) !== -1)
        ) {
          return true;
        }
      }

      function onDrop(source, target) {
        // see if the move is legal
        var move = game.move({
          from: source,
          to: target,
          promotion: "q", // NOTE: always promote to a queen for example simplicity
        });

        // illegal move
        if (move === null) {
          return "snapback";
        }
        
      
        pngBox.innerText = game.pgn();
        
      }

      function onMouseoverSquare(square, piece) {
        // get list of possible moves for this square
        var moves = game.moves({
          square: square,
          verbose: true,
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        // highlight the square they moused over
        greySquare(square);

        // highlight the possible squares for this piece
        for (var i = 0; i < moves.length; i++) {
          greySquare(moves[i].to);
        }
      }

      function onMouseoutSquare(square, piece) {
        removeGreySquares();
      }

      // update the board position after the piece snap
      // for castling, en passant, pawn promotion
      function onSnapEnd() {
        board.position(game.fen());
      }

      function pieceTheme(piece) {
        // wikipedia theme for white pieces
        if (piece.search(/w/) !== -1) {
          return "assets/img/chesspieces/wikipedia/" + piece + ".png";
        }

        // alpha theme for black pieces
        return "assets/img/chesspieces/wikipedia/" + piece + ".png";
      }

     
      var config = {
        pieceTheme: pieceTheme,
        draggable: true,
        position: "start",
        onDragStart: onDragStart,
        onDrop: onDrop,
        onMouseoutSquare: onMouseoutSquare,
        onMouseoverSquare: onMouseoverSquare,
        onSnapEnd: onSnapEnd,
      };

      var board = Chessboard("myBoard", config);