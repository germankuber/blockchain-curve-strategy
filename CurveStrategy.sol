//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

interface ICurveFi_DepositY {
    function add_liquidity(
        uint256[3] calldata uamounts,
        uint256 min_mint_amount
    ) external;

    function remove_liquidity(uint256 _amount, uint256[4] calldata min_uamounts)
        external;

    function remove_liquidity_imbalance(
        uint256[4] calldata uamounts,
        uint256 max_burn_amount
    ) external;

    function coins(uint256 i) external view returns (address);

    function underlying_coins(uint256 i) external view returns (address);

    function underlying_coins() external view returns (address[4] memory);

    function curve() external view returns (address);

    function token() external view returns (address);

    function future_fee() external view returns (uint256);
}

interface ICurveGauge {
    function deposit(uint256 amount, address addr) external;
}

interface ICurveDao {
    function mint(address gauge_addr) external;
}

contract CurveStrategy {
    ICurveFi_DepositY curveFi_DepositY;
    address curve;
    address curveFiToken = 0x6c3F90f043a72FA612cbac8115EE7e52BDe6E490;
    address curveGauge = 0xbFcF63294aD7105dEa65aA58F8AE5BE2D9d0952A;
    address dai = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address curveDao = 0xd061D61a4d941c39E5453435B6345Dc261C2fcE0;
    address curveCrvToken = 0xD533a949740bb3306d119CC777fa900bA034cd52;
    address uniswap = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    IUniswapV2Router02 uniRouter =
        IUniswapV2Router02(0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D);

    event AddLiquidity(uint256 amount);
    event MintCurveDao();
    event DepositToken(string token, uint256 amount);
    event SwapToken(uint256 amountIn);
    event CantSwapToken();

    constructor() {
        curveFi_DepositY = ICurveFi_DepositY(
            0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7
        );
        curve = 0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7;
    }

    //First: Give permission from wallet caller to contract
    function execute(uint256 _amount) public {
        uint256[3] memory amounts;
        amounts[0] = _amount;
        IERC20(dai).transferFrom(msg.sender, address(this), _amount);
        IERC20(dai).approve(curve, _amount);
        curveFi_DepositY.add_liquidity(amounts, 0);
        emit AddLiquidity(_amount);

        uint256 curveFiTokens = IERC20(curveFiToken).balanceOf(address(this));
        IERC20(curveFiToken).approve(curveGauge, curveFiTokens);
        ICurveGauge(curveGauge).deposit(curveFiTokens, address(this));
        emit DepositToken("CurveFi", curveFiTokens);

        ICurveDao(curveDao).mint(curveGauge);
        emit MintCurveDao();
    }

    event DataTest(string msg, uint256 id);

    function generateEvent(string calldata msg, uint256 id) public {
        emit DataTest(msg, id);
    }

    function executeSwap() public {
        uint256 curveGaugeBalance = IERC20(curveGauge).balanceOf(address(this));

        IERC20(curveCrvToken).approve(uniswap, curveGaugeBalance);

        uint256 amountIn = IERC20(curveCrvToken).balanceOf(address(this));

        address[] memory path = new address[](2);
        path[0] = curveCrvToken;
        path[1] = dai;
        if (amountIn > 0) {
            uniRouter.swapExactTokensForTokens(
                amountIn,
                0,
                path,
                address(this),
                block.timestamp + 120
            );
            emit SwapToken(amountIn);
        } else {
            emit CantSwapToken();
        }
    }
}
